import { useState, useEffect } from 'react';
import { Chat } from '@/types/chat';
import { ChatList } from './ChatList';
import { ChatView } from './ChatView';
import { ChatHeader } from './ChatHeader';
import { MessageInput } from './MessageInput';
import { useChats } from '@/hooks/useChats';
import { useMessages } from '@/hooks/useMessages';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const WhatsAppChat = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [aiActive, setAiActive] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  const { chats, loading: chatsLoading } = useChats();
  const { messages, loading: messagesLoading, sending, sendMessage } = useMessages(selectedChat?._id);
  const { toast } = useToast();

  const handleSelectChat = async (chat: Chat) => {
    setSelectedChat(chat);
    
    // Fetch AI status from Supabase
    try {
      const { data, error } = await supabase
        .from('ai_settings')
        .select('active_ai')
        .eq('session_id', chat.sessionId)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching AI status:', error);
      }
      
      setAiActive(data?.active_ai || false);
    } catch (error) {
      console.error('Error fetching AI status:', error);
      setAiActive(false);
    }
  };

  const handleSendMessage = (content: string) => {
    if (selectedChat) {
      sendMessage(content, selectedChat.sessionId);
    }
  };

  const handleToggleAI = async (active: boolean) => {
    if (!selectedChat) return;
    
    try {
      setAiLoading(true);
      
      // Update or create AI settings in Supabase
      const { error } = await supabase
        .from('ai_settings')
        .upsert(
          { 
            session_id: selectedChat.sessionId, 
            active_ai: active 
          },
          { 
            onConflict: 'session_id',
            ignoreDuplicates: false 
          }
        );
      
      if (error) {
        throw error;
      }
      
      setAiActive(active);
      
      toast({
        title: active ? "AI Activado" : "AI Desactivado",
        description: `El asistente de IA ha sido ${active ? 'activado' : 'desactivado'} para este chat`,
      });
      
    } catch (error) {
      console.error('Error toggling AI:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del AI",
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar with chat list */}
      <div className="w-1/3 bg-sidebar-background border-r border-border flex flex-col">
        <div className="p-4 bg-whatsapp-primary text-white">
          <h1 className="text-xl font-semibold">WhatsApp Business</h1>
        </div>
        <ChatList
          chats={chats}
          selectedChatId={selectedChat?._id}
          onSelectChat={handleSelectChat}
          loading={chatsLoading}
        />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <ChatHeader
              chat={selectedChat}
              aiActive={aiActive}
              onToggleAI={handleToggleAI}
              loading={aiLoading}
            />
            <ChatView messages={messages} loading={messagesLoading} />
            <MessageInput onSendMessage={handleSendMessage} loading={sending} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-chat-background">
            <div className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💬</span>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                WhatsApp Business
              </h2>
              <p className="text-muted-foreground">
                Selecciona un chat para comenzar a conversar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};