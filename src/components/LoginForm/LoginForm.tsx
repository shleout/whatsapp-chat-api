import React, { useState } from 'react';
import { type Credentials } from '../../types';

interface Props {
  onLogin: (creds: Credentials) => void;
}

const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idInstance || !apiTokenInstance || !apiUrl) {
      alert('Заполните все поля');
      return;
    }
    onLogin({ idInstance, apiTokenInstance, apiUrl });
  };

  return (
    <div className="login-container">
      <h2>Вход в GREEN-API</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="apiUrl (например, https://4100.api.green-api.com)"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="idInstance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
        />
        <input
          type="text"
          placeholder="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;