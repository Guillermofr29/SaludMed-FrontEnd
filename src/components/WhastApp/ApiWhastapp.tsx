import React, { useState } from 'react';
import axios from 'axios';

const WhatsAppChatbot: React.FC = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:3001/whatsapp', { message });
      alert('Message sent!');
    } catch (error) {
      console.error(error);
      alert('Failed to send message');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">WhatsApp Chatbot</h1>
      <textarea
        className="w-1/2 p-2 border border-gray-300 rounded mb-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={sendMessage}
      >
        Send Message
      </button>
    </div>
  );
};

export default WhatsAppChatbot;
