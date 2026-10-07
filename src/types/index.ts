export interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
  apiUrl: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: number;
}

export interface IncomingNotification {
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage: string;
    senderData: {
      chatId: string; // "79876543210@c.us"
      sender: string;
      senderName: string;
    };
    messageData: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
    };
    timestamp: number;
  };
}

export interface SendMessageResponse {
  idMessage: string;
}