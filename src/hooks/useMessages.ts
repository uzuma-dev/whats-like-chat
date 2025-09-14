import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';
import { chatApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useMessages = (chatId?: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const fetchMessages = async () => {
    if (!chatId) return;
    
    try {
      setLoading(true);
      const response = await chatApi.getMessages(chatId);
      if (response.success) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los mensajes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string, sessionId: string) => {
    if (!chatId) return;

    try {
      setSending(true);
      const response = await chatApi.sendMessage(chatId, { content, sessionId });
      if (response.success) {
        setMessages(prev => [...prev, response.data]);
        // Optionally fetch messages again to get AI response
        setTimeout(() => fetchMessages(), 1000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (chatId) {
      setMessages([]);
      fetchMessages();
    }
  }, [chatId]);

  return {
    messages,
    loading,
    sending,
    sendMessage,
    refetch: fetchMessages
  };
};