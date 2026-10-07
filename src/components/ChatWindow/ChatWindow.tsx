import React, { useState } from 'react';
import { type Credentials, type ChatMessage } from '../../types';
import { sendMessage } from '../../api/greenApi';
import Message from '../Message/Message.tsx';

interface Props {
  credentials: Credentials;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatWindow: React.FC<Props> = ({ credentials, messages, setMessages }) => {
  const [inputText, setInputText] = useState('');
  const [chatId, setChatId] = useState('');

  const handleSend = async () => {
    if (!inputText.trim() || !chatId.trim()) return;

    const response = await sendMessage(credentials, chatId, inputText);
    if (response) {
      const newMessage: ChatMessage = {
        id: response.idMessage,
        text: inputText,
        sender: 'me',
        timestamp: Math.floor(Date.now() / 1000),
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>WhatsApp Чат</h3>
        <input
          type="text"
          placeholder="Номер получателя (например, 79999999999@c.us)"
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
        />
      </div>

      <div className="messages-container">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Введите сообщение..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Отправить</button>
      </div>
    </div>
  );
};

export default ChatWindow;