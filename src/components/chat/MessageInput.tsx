import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  loading?: boolean;
}

export const MessageInput = ({ onSendMessage, loading }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 bg-background border-t border-border">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="flex-1 bg-input border-input-border focus:ring-primary"
        disabled={loading}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || loading}
        className="bg-primary hover:bg-primary-hover text-primary-foreground"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};