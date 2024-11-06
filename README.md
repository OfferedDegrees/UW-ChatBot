![Backend Status](https://github.com/RyanLe101/UW-ChatBot/actions/workflows/ci.yml/badge.svg)


# UW-ChatBot

UW ChatBot is a 24/7 web-based chat interface designed to help users find information about the University of Washington quickly and efficiently. Users can ask questions related to programs, departments, registration, deadlines, and various other university-specific details. The chatbot provides direct responses, often accompanied by relevant follow-up questions for greater context. This system eliminates the need for navigating multiple web pages on the UW website and serves as a convenient tool for prospective and current students, parents, and university staff.

Access UW Chatbot at [UW CHATBOT!](https://github.com/RyanLe101/UW-ChatBot).

## How to Use the Chatbot

> **Note:** The below functionality is a work in progress, as our fine-tuned model isn’t connected to our chatbot yet.

1. **Access the chat interface** by opening a web browser and navigating to the UW Chatbot URL.
2. On the main page, you will see the chat interface. **Click the input field** and type in a question you have about UW.
3. **Press the send button** to submit your question, and the chatbot will reply with a response.
4. **Provide clarifying information** if necessary and answer any follow-up questions from the chatbot to receive a more accurate and personalized response.

---

## Local Installation & Setup

   ```bash
   git clone https://github.com/RyanLe101/UW-ChatBot.git
   ```

This project follows a client-server architecture. Follow the links below for each detailed local setup and installation instructions:

- **[FRONTEND](https://github.com/RyanLe101/UW-ChatBot/blob/main/UW-ChatBot/Frontend/frontend/README.md)**: Contains all frontend files for the chat interface, including the user interface and user interactions. This folder includes components like `Chatbot.tsx`, `Feedback.tsx`, `UserInput.tsx`, and others that render the chat interface and handle user input.

- **[BACKEND](https://github.com/RyanLe101/UW-ChatBot/blob/main/UW-ChatBot/Backend/README.md)**: Holds the backend code responsible for handling HTTP requests, processing queries, interacting with the MongoDB database, and integrating AWS services if enabled. This folder includes directories for `controllers`, `services`, `repositories`, and `models` to structure the backend functionality.

---

## How to Report a Bug

To report a bug, please visit the [UW-ChatBot Issue Tracker](https://github.com/RyanLe101/UW-ChatBot/issues). When reporting a bug, follow the guidelines below to help us identify and address the issue efficiently:

1. **Title**: Provide a brief, descriptive title for the bug.
2. **Description**: Explain the issue, including any error messages, unexpected behaviors, or steps that led to the bug.
3. **Steps to Reproduce**: Detail the actions you took leading up to the issue, so our team can replicate it. Be as specific as possible.
4. **Expected and Actual Results**: Describe what you expected to happen and what actually occurred.
5. **Environment Details**: Include relevant details such as your browser, OS, device, and any other context that might help with troubleshooting.
6. **Screenshots**: Attach screenshots or videos if applicable, as they help visualize the issue.

For more detailed guidance on writing a good bug report, please refer to the [Mozilla Bug Writing Guidelines](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Bug_writing_guidelines).

---

## UW ChatBot Team
[Eric](https://github.com/eric-huychung)    [Ryan](https://github.com/RyanLe101)   [Emily](https://github.com/emilyngo001)   [Carter](https://github.com/carterb-a)   [Thien](https://github.com/Thienanngvyen)

---

For any additional help or questions, refer to the project documentation or contact us through our issue tracker.
