import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { MessageBubble } from './MessageBubble';

interface ChatViewProps {
  messages: Message[];
  loading?: boolean;
}

export const ChatView = ({ messages, loading }: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (loading) {
    return (
      <div className="flex-1 p-4 bg-chat-background">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-4 animate-pulse">
            <div className={`h-10 bg-muted rounded-lg max-w-[70%] ${i % 2 === 0 ? 'ml-auto' : ''}`}></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-chat-background">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          No hay mensajes en este chat
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <MessageBubble key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};