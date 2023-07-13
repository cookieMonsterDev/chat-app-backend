export interface ChatCardProps {
  chatId: string;
  chatName: string;
  bgColor: string;
  imgUrl?: string;
  unreadCounter?: number;
  lastMessage?: string;
  lastMessageTime?: Date;
}
