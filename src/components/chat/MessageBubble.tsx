import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.sender === 'user';

  return (
    <div className={cn("flex mb-4", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-4 py-2 break-words",
          isUser
            ? "bg-message-user text-message-user-foreground rounded-br-none"
            : "bg-message-bot text-message-bot-foreground rounded-bl-none shadow-sm border border-border"
        )}
      >
        {message.content}
      </div>
    </div>
  );
};