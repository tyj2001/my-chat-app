import { useState } from 'react';
import fetch from 'node-fetch';

const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const result = await fetch('https://purgpt.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "messages":[{"role":"user", "content": text}],
        "key": "purgpt-5bqnjwv8wn3w8lxcctesuk",
        "model": "gpt-3.5-turbo"
      })
    });

    if (result.ok) {
      const response = await result.json();
      setMessages(prevMessages => [...prevMessages, text, response.choices[0].message.content]);
    }
  };

  return (
    <div>
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        onKeyPress={e => e.key === 'Enter' ? sendMessage() : null}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((message, index) => <p key={index}>{message}</p>)}
      </div>
    </div>
  );
};

export default Chat;
