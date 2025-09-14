export interface Chat {
  _id: string;
  sessionId: string;
  lastMessage: string;
  messageCount: number;
}

export interface Message {
  type: 'human' | 'ai';
  content: string;
  sender: 'user' | 'bot';
  messageType: 'text';
  metadata: Record<string, any>;
}

export interface ChatResponse {
  success: boolean;
  data: Chat[];
}

export interface MessagesResponse {
  success: boolean;
  data: Message[];
}

export interface SendMessageRequest {
  content: string;
  sessionId: string;
}

export interface SendMessageResponse {
  success: boolean;
  data: Message;
}