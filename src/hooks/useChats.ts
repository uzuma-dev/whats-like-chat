import { useState, useEffect } from 'react';
import { Chat } from '@/types/chat';
import { chatApi } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await chatApi.getChats();
      if (response.success) {
        setChats(response.data);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los chats",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    chats,
    loading,
    refetch: fetchChats
  };
};