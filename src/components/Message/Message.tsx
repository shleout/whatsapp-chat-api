import React from 'react';
import { type ChatMessage } from '../../types';

interface Props {
  message: ChatMessage;
}

const Message: React.FC<Props> = ({ message }) => {
  const isMe = message.sender === 'me';
  return (
    <div className={`message ${isMe ? 'message-me' : 'message-them'}`}>
      <div className="message-text">{message.text}</div>
      <div className="message-time">
        {new Date(message.timestamp * 1000).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  );
};

export default Message;