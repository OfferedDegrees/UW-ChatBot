import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';
import logo from './uw chatbot logo.png';

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<{ sender: 'bot' | 'user'; text: string }[]>([]);  // Chat history
  const [loading, setLoading] = useState(false); // New loading state
  const [feedback, setFeedback] = useState(0); // New feedback state
  const apiKey = 'insert_api_key'; // Replace with OpenAI API key

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Add initial bot message
  useEffect(() => {
    const initialBotMessage = {
      sender: 'bot' as const,
      text: 'Woof woof! 🐾 I know all about UW',
    };
    setConversation([initialBotMessage]);
  }, []);

  // Auto scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() === '' || loading) return; // Prevent submission if loading

    const userMessage = { sender: 'user' as const, text: question };
    setConversation((prev) => [...prev, userMessage]);
    setLoading(true); // Set loading state to true

    let botMessage = '';
    setConversation((prev) => [...prev, { sender: 'bot', text: '...' }]); // Placeholder for bot message

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
        throw new Error(`HTTP error! status: ${response.status} - ${await response.text()}`);
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

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
              if (json.choices && json.choices[0].delta) {
                const content = json.choices[0].delta.content;
                botMessage += content; // Append new content
                // Update conversation with the latest bot message
                setConversation((prev) => [
                  ...prev.slice(0, -1), // Replace the placeholder message
                  { sender: 'bot', text: botMessage }, // Update the message
                ]);
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          }
        });
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = {
        sender: 'bot' as const,
        text: 'Sorry, I could not fetch the response at this time.',
      };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false); // Set loading state to false
    }

    setQuestion('');
  };

  const suggestedQuestions = [
    'Where can I park at UW?',
    'What are some A&H classes I can take?',
    'How much is tuition this quarter?'
  ];

  const handleFeedback = (rating: number) => {
    setFeedback(rating);
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <img src={logo} alt="ChatBot Logo" className="chat-logo" />
        <h1>UW ChatBot</h1>
      </div>
      <div className="chat-body">
        {/* Chat history */}
        <div className="chat-history">
          {conversation.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} /> {/* Scroll to end*/}
        </div>

        {/* Input form */}
        <form className="chat-form" onSubmit={handleQuestionSubmit}>
          <input
            type="text"
            placeholder="Ask me anything about UW..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading} // Disable input while loading
          />
          <button type="submit" disabled={loading}>➤</button> {/* Disable button while loading */}
        </form>

        {/* Suggested questions */}
        <div className="suggested-questions">
          {suggestedQuestions.map((suggestion, idx) => (
            <button key={idx} onClick={() => setQuestion(suggestion)}>
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
    </div>
  );
};

export default Chatbot;
