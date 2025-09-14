import { Chat } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string;
  onSelectChat: (chat: Chat) => void;
  loading?: boolean;
}

export const ChatList = ({ chats, selectedChatId, onSelectChat, loading }: ChatListProps) => {
  if (loading) {
    return (
      <div className="p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="mb-3 animate-pulse">
            <div className="h-16 bg-muted rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={cn(
            "flex items-center p-4 cursor-pointer hover:bg-secondary transition-colors border-b border-border",
            selectedChatId === chat._id && "bg-secondary"
          )}
          onClick={() => onSelectChat(chat)}
        >
          <div className="w-12 h-12 bg-whatsapp-secondary rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-semibold text-lg">
              {chat.sessionId.slice(-2)}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-foreground truncate">
                Chat {chat.sessionId}
              </h3>
              <span className="text-xs text-muted-foreground">
                {chat.messageCount} msgs
              </span>
            </div>
            <p className="text-sm text-muted-foreground truncate">
              {chat.lastMessage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};