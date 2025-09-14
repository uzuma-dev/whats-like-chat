import { ChatResponse, MessagesResponse, SendMessageRequest, SendMessageResponse } from '@/types/chat';

const API_BASE_URL = 'http://localhost:3000'; // Use relative URLs; avoids process.env in browser

export const chatApi = {
  async getChats(page = 1, limit = 20, sessionId?: string): Promise<ChatResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(sessionId && { sessionId })
    });

    const response = await fetch(`${API_BASE_URL}/api/chats?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }
    return response.json();
  },

  async getMessages(chatId: string, page = 1, limit = 50): Promise<MessagesResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    const response = await fetch(`${API_BASE_URL}/api/chats/${chatId}/messages?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return response.json();
  },

  async sendMessage(chatId: string, data: SendMessageRequest): Promise<SendMessageResponse> {
    const response = await fetch(`${API_BASE_URL}/api/chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  }
};