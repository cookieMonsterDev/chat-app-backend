export interface ChatCardProps {
  chatName: string;
  imgUrl?: string;
  unreadCounter?: number;
  lastMessage?: string;
  lastMessageTime?: Date;
  isActive?: boolean;
}
