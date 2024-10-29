import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '../Chatbot';

describe('Chatbot Component', () => {
  test('renders the chatbot header', () => {
    render(<Chatbot />);
    const headerElement = screen.getByText(/UW ChatBot/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('displays initial bot message', () => {
    render(<Chatbot />);
    const initialBotMessage = screen.getByText(/Woof woof! 🐾 I know all about UW/i);
    expect(initialBotMessage).toBeInTheDocument();
  });

  test('submits user question and receives bot response', async () => {
    render(<Chatbot />);
    
    const inputElement = screen.getByPlaceholderText(/Ask me anything about UW.../i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /➤/ });

    fireEvent.change(inputElement, { target: { value: 'What is UW?' } });
    fireEvent.click(submitButton);

    // Check if the user question is displayed
    expect(screen.getByText('What is UW?')).toBeInTheDocument();

    // Wait for the bot's response
    await waitFor(() => {
      const botResponse = screen.getByText(/You may register on Jun 17 - Sep 24, 2024. Registration opens at midnight./i);
      expect(botResponse).toBeInTheDocument();
    });
  });

  test('does not submit empty questions', () => {
    render(<Chatbot />);

    const inputElement = screen.getByPlaceholderText(/Ask me anything about UW.../i) as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /➤/ });

    fireEvent.change(inputElement, { target: { value: '' } });
    fireEvent.click(submitButton);

    // No user message should be displayed
    expect(screen.queryByText(/You may register on Jun 17 - Sep 24, 2024/i)).not.toBeInTheDocument();
  });

  test('suggested questions fill the input field', async () => {
    render(<Chatbot />);

    const suggestedButton = screen.getByText(/Where can I park at UW?/i);
    fireEvent.click(suggestedButton);

    // Re-query the input element after the interaction
    const inputElement = screen.getByPlaceholderText(/Ask me anything about UW.../i) as HTMLInputElement; 

    // Using waitFor to handle any potential asynchronous updates
    await waitFor(() => {
      expect(inputElement.value).toBe('Where can I park at UW?');
    });
  });
});
