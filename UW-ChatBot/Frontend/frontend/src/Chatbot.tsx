import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState<{ sender: 'bot' | 'user'; text: string }[]>([]); // Chat history
  const [feedback, setFeedback] = useState(0);

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() === '') return;

    const userMessage = { sender: 'user' as const, text: question };
    setConversation((prev) => [...prev, userMessage]);

    const botMessage = {
      sender: 'bot' as const,
      text: 'You may register on Jun 17 - Sep 24, 2024. Registration opens at midnight.',
    };
    setTimeout(() => setConversation((prev) => [...prev, botMessage]), 500); // Bot responds after 500ms

    setQuestion('');
  };

  const handleFeedback = (rating: number) => {
    setFeedback(rating);

  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <h1>UW ChatBot</h1>
      </div>
      <div className="chat-body">
        <div className="bot-message">
          <p>Woof woof! 🐾 I know all about UW</p>
        </div>

        {/* Chat history */}
        <div className="chat-history">
          {conversation.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Input form */}
        <form className="chat-form" onSubmit={handleQuestionSubmit}>
          <input
            type="text"
            placeholder="Ask me anything about UW..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit">➤</button>
        </form>

        {/* Suggested questions */}
        <div className="suggested-questions">
          <button onClick={() => setQuestion('Where can I park at UW?')}>
            Where can I park at UW?
          </button>
          <button onClick={() => setQuestion('What are some A&H classes I can take?')}>
            What are some A&H classes I can take?
          </button>
          <button onClick={() => setQuestion('How much is tuition this quarter?')}>
            How much is tuition this quarter?
          </button>
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
