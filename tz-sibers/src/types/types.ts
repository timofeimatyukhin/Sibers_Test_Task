export interface User {
  id: number;
  name: string;
  avatar: string;
  username: string;
  posts?: Array<{ sentence?: string }>;
}

export interface UserPreview {
  id: number;
  name: string;
}

export interface Chat {
  id: number;
  name: string;
  members: UserPreview[];
  lastMessage?: string;
  messages?: Message[];
}

type MessageSenderType = 'user' | 'bot';

export interface Message {
  id: number;
  senderId: number;
  senderType: MessageSenderType;
  text: string;
}