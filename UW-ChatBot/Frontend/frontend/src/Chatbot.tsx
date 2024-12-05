import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import logo from './photos/uwchatbotlogo.png';
import axios from 'axios';
import Modal from './Modal';

type QualityData = {
  accuracy: string | null;
  completeness: string | null;
  speed: string | null;
  errorHandling: string | null;
};

type Message = {
  sender: "bot" | "user";
  text: string;
};

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [useChatGPT, setUseChatGPT] = useState(true);
  const [hardcodedStep, setHardcodedStep] = useState(0); // Track the step of the conversation
  const [credits, setCredits] = useState(0); // Store the number of credits
  const [isResident, setIsResident] = useState(false); // Store if the student is an in-state resident
  // aws
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [suggestions] = useState([
    "What are the tuition fees?",
    "How many credits do I need?",
    "What is the GPA requirement?",
    "Tell me about UW campus life.",
  ]);
  const [qualityData, setQualityData] = useState<QualityData>({
    accuracy: '80%',
    completeness: '100%',
    speed: '2.868s',
    errorHandling: '60%',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    setConversation([{ sender: 'bot', text: 'Woof woof! 🐾 I know all about UW' }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() === '' || loading) return;

    const userMessage: Message = { sender: 'user', text: question };
    setConversation((prev) => [...prev, userMessage]);
    setLoading(true);

    if (useChatGPT) {
      await fetchChatGPTResponse(question);
    } else {
      await handleHardcodedResponse(question);
    }

    setQuestion('');
  };

  const fetchAWSResponse = async () => {
    try {
      const res = await axios.post('http://localhost:5000/generate-response', { inputText });
      setResponseText(res.data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  const fetchChatGPTResponse = async (question: string) => {
    let botMessage = '';
    setConversation((prev) => [...prev, { sender: 'bot', text: '...' }]);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: question }],
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const messages = chunk.split('\n').filter((line) => line.trim() !== '');

          messages.forEach((msg) => {
            if (msg.startsWith('data: ')) {
              const data = msg.replace('data: ', '');
              try {
                const json = JSON.parse(data);
                if (json.choices && json.choices[0].delta && json.choices[0].delta.content) {
                  botMessage += json.choices[0].delta.content;
                  setConversation((prev) => [
                    ...prev.slice(0, -1),
                    { sender: 'bot', text: botMessage },
                  ]);
                }
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
            }
          });
        }
      } else {
        setConversation((prev) => [...prev, { sender: 'bot', text: 'Sorry, I could not fetch the response at this time.' }]);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setConversation((prev) => [...prev, { sender: 'bot', text: 'Sorry, I could not fetch the response at this time.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleHardcodedResponse = async (question: string) => {
    if (hardcodedStep === 0) {
      setConversation((prev) => [
        ...prev,
        { sender: 'bot', text: 'How many credits are you taking?' },
      ]);
      setHardcodedStep(1);
    } else if (hardcodedStep === 1) {
      const credits = parseInt(question);
      if (isNaN(credits) || credits < 1) {
        setConversation((prev) => [
          ...prev,
          { sender: 'bot', text: 'Please enter a valid number of credits.' },
        ]);
        setLoading(false);
        return;
      }
      setCredits(credits);
      setConversation((prev) => [
        ...prev,
        { sender: 'bot', text: 'Are you an in-state resident? (yes/no)' },
      ]);
      setHardcodedStep(2);
    } else if (hardcodedStep === 2) {
      const resident = question.toLowerCase() === 'yes';
      setIsResident(resident);
      const tuition = calculateTuition(credits, resident);
      setConversation((prev) => [
        ...prev,
        { sender: 'bot', text: `Your tuition is $${tuition.toLocaleString()}.` },
      ]);
      setHardcodedStep(0); // Reset for next question
    }

    setLoading(false);
  };

  const calculateTuition = (credits: number, isResident: boolean): number => {
    const tuitionRates = {
      resident: [1040, 1471, 1888, 2305, 2722, 3139, 3556, 3973, 4390],
      nonResident: [3076, 4500, 5924, 7348, 8772, 10196, 11620, 13044, 14468],
    };
    const rateArray = isResident ? tuitionRates.resident : tuitionRates.nonResident;
    if (credits >= 10) return rateArray[8];
    return rateArray[credits - 1];
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuestion(suggestion);
  };

  const fetchQualityData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sheet-data');
      setQualityData(response.data);
    } catch (error) {
      console.error('Error fetching quality data:', error);
    }
  };

  const openModal = () => {
    fetchQualityData();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <img src={logo} alt="ChatBot Logo" className="chat-logo" />
        <h1>UW ChatBot</h1>
      </div>
      <div className="chat-body">
        <div className="chat-history">
          {conversation.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form className="chat-form" onSubmit={handleQuestionSubmit}>
          <input
            type="text"
            placeholder="Ask me anything about UW..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>➤</button>
          <button
            className="toggle-chatgpt-button"
            onClick={() => setUseChatGPT(!useChatGPT)}
          >
            {useChatGPT ? 'ChatGPT' : 'UW ChatBot'}
          </button>
        </form>

        <div className="suggested-questions">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
        {/* Feedback section
        <div className="feedback-section">
          <p>Please give us feedback!</p>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${feedback >= star ? 'selected' : ''}`}
                onClick={() => handleFeedback(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div> */}
      </div>
      <button className="quality-button" onClick={openModal}>
        View Quality Metrics
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Chatbot Quality Metrics</h2>
        <ul>
          <li><strong>Accuracy:</strong> {qualityData.accuracy || 'N/A'}</li>
          <li><strong>Completeness:</strong> {qualityData.completeness || 'N/A'}</li>
          <li><strong>Speed:</strong> {qualityData.speed || 'N/A'}</li>
          <li><strong>Error Handling:</strong> {qualityData.errorHandling || 'N/A'}</li>
        </ul>
      </Modal>
    </div>
  );
};

export default Chatbot;
