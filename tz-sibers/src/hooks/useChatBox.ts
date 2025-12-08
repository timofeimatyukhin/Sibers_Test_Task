import { useEffect, useMemo, useRef } from 'react';
import personSvg from '../assets/images/person.svg';
import type { Chat, User } from '../types/types';

interface UseChatBoxParams {
  isAnyChats: boolean;
  selectedChat?: Chat;
  usersData?: User[];
}

interface ChatBoxMessage {
  id: number;
  text: string;
  senderName: string;
  avatar: string;
  isUser: boolean;
}

interface UseChatBoxResult {
  state: 'messages' | 'chatEmpty' | 'selectChat' | 'createChat';
  messages: ChatBoxMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function useChatBox({ isAnyChats, selectedChat, usersData = [] }: UseChatBoxParams): UseChatBoxResult {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = useMemo<ChatBoxMessage[]>(() => {
    if (!selectedChat?.messages) return [];

    return selectedChat.messages.map((msg) => {
      const isUser = msg.senderId === -1;
      const sender = usersData.find((user) => user.id === msg.senderId);
      const member = selectedChat.members.find((m) => m.id === msg.senderId);

      return {
        id: msg.id,
        text: msg.text,
        isUser,
        senderName: isUser ? 'You' : member?.name || 'User',
        avatar: isUser ? personSvg : sender?.avatar || '',
      };
    });
  }, [selectedChat, usersData]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  let state: UseChatBoxResult['state'] = 'createChat';
  if (selectedChat && messages.length > 0) state = 'messages';
  else if (selectedChat) state = 'chatEmpty';
  else if (isAnyChats) state = 'selectChat';

  return { state, messages, messagesEndRef };
}
