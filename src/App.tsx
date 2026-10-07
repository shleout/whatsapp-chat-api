import { useState, useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import ChatWindow from './components/ChatWindow/ChatWindow';
import { receiveNotification, deleteNotification } from './api/greenApi';
import { type Credentials, type ChatMessage } from './types';
import './App.css';

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const credentialsRef = useRef(credentials);

  credentialsRef.current = credentials;

  useEffect(() => {
    if (!credentials) return;
  
    const interval = setInterval(async () => {
      const creds = credentialsRef.current!;
      const notification = await receiveNotification(creds);
  
      if (!notification) return;
  
      console.log('Notification:', notification);
  
      await deleteNotification(creds, notification.receiptId);
  
      if (
        notification.body.typeWebhook === 'incomingMessageReceived' &&
        notification.body.messageData.typeMessage === 'textMessage'
      ) {
        const text = notification.body.messageData.textMessageData?.textMessage;
        if (text) {
          const newMessage: ChatMessage = {
            id: notification.body.idMessage,
            text,
            sender: 'them',
            timestamp: notification.body.timestamp,
          };
          setMessages((prev) => [...prev, newMessage]);
        }
      }
    }, 5000);
  
    return () => clearInterval(interval);
  }, [credentials]);

  const handleLogin = (creds: Credentials) => {
    setCredentials(creds);
  };

  if (!credentials) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <ChatWindow
      credentials={credentials}
      messages={messages}
      setMessages={setMessages}
    />
  );
}

export default App;