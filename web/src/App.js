import './App.css';
import React, { useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:3001"

function App() {
  const [response, setResponse] = useState("");
  
  const messages = document.getElementById('messages')
  const form = document.getElementById('form');
  const input = document.getElementById('input');
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", data => {
      setResponse(data)
    });

    return () => socket.disconnect
  }, []);


  return (
    <div className="App">
      <div className="Main">
        <div className="SidePanel">

        </div>
        <div className="ChatPanel">
          <p>It's <time dateTime={response}>{response}</time></p>
          <ul id="Messages"></ul>
          <form id="form" className="Form">
            <input id="input" className="Input" autoComplete="off"/><button className="Button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
