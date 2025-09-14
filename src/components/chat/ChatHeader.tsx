import { Chat } from '@/types/chat';
import { Switch } from '@/components/ui/switch';
import { Bot } from 'lucide-react';

interface ChatHeaderProps {
  chat: Chat;
  aiActive: boolean;
  onToggleAI: (active: boolean) => void;
  loading?: boolean;
}

export const ChatHeader = ({ chat, aiActive, onToggleAI, loading }: ChatHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-whatsapp-primary text-white border-b border-border">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-whatsapp-secondary rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-semibold">
            {chat.sessionId.slice(-2)}
          </span>
        </div>
        <div>
          <h2 className="font-semibold">Chat {chat.sessionId}</h2>
          <p className="text-sm opacity-75">{chat.messageCount} mensajes</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Bot className="w-5 h-5" />
        <span className="text-sm">AI</span>
        <Switch
          checked={aiActive}
          onCheckedChange={onToggleAI}
          disabled={loading}
          className="data-[state=checked]:bg-whatsapp-secondary"
        />
      </div>
    </div>
  );
};