// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// App.js (frontend, React)
import React, { useState } from 'react';
import axios from 'axios';

function Chatbot() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/generate-response', { inputText });
      setResponseText(res.data.response);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h3>Response: </h3>
        <p>{responseText}</p>
      </div>
    </div>
  );
}

export default Chatbot;