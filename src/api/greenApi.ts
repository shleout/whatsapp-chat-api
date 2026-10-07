import axios from 'axios';
import { type Credentials, type IncomingNotification, type SendMessageResponse } from '../types';

export const sendMessage = async (
  creds: Credentials,
  chatId: string,
  message: string
): Promise<SendMessageResponse | null> => {
  try {
    const url = `${creds.apiUrl}/waInstance${creds.idInstance}/sendMessage/${creds.apiTokenInstance}`;
    const response = await axios.post(url, { chatId, message });
    return response.data as SendMessageResponse;
  } catch (error) {
    console.error('sendMessage error:', error);
    return null;
  }
};

export const receiveNotification = async (
  creds: Credentials
): Promise<IncomingNotification | null> => {
  try {
    const url = `${creds.apiUrl}/waInstance${creds.idInstance}/receiveNotification/${creds.apiTokenInstance}`;
    const response = await axios.get(url);
    return response.data ? (response.data as IncomingNotification) : null;
  } catch (error) {
    console.error('receiveNotification error:', error);
    return null;
  }
};

export const deleteNotification = async (
  creds: Credentials,
  receiptId: number
): Promise<void> => {
  try {
    const url = `${creds.apiUrl}/waInstance${creds.idInstance}/deleteNotification/${creds.apiTokenInstance}/${receiptId}`;
    await axios.delete(url);
  } catch (error) {
    console.error('deleteNotification error:', error);
  }
};