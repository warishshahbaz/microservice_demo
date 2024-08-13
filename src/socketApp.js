import React, { useEffect, useState } from "react";

const SocketApp = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket("ws://localhost:5000");
    setSocket(ws);

    // Listen for messages
    ws.onmessage = (event) => {
      console.log(event, "-------------------------------");
      setMessages((prevMessages) => [...prevMessages, event.data.Blob]);
    };

    // Clean up on component unmount
    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.send(message);
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>WebSocket Chat</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SocketApp;
