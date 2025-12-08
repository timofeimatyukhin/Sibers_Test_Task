import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMessageToChat } from '../api/query';
import type { User, Message, Chat } from '../types/types';

interface UseBotMessagesProps {
  chats: Chat[];
  users: User[];
  enabled: boolean;
}

export function useBotMessages({ chats, users, enabled }: UseBotMessagesProps) {
  const queryClient = useQueryClient();

  const { mutate: sendBotMessage } = useMutation({
    mutationFn: ({ chatId, message }: { chatId: number; message: Message }) =>
      addMessageToChat(chatId, message),
    onSuccess: () => {
      queryClient.setQueryData(['chats'], (old: any) => old);
    },
  });

  useEffect(() => {
    if (!enabled || chats.length === 0 || users.length === 0) return;

    const sendRandomMessage = () => {
      const randomChat = chats[Math.floor(Math.random() * chats.length)];
      
      if (!randomChat.members || randomChat.members.length === 0) return;
      const randomMember = randomChat.members[Math.floor(Math.random() * randomChat.members.length)];
      
      const user = users.find(u => u.id === randomMember.id);
      if (!user || !user.posts || user.posts.length === 0) return;
      
      const randomPost = user.posts[Math.floor(Math.random() * user.posts.length)];
      const sentence = randomPost.sentence || 'Hello!';
      
      const message: Message = {
        id: Date.now(),
        senderId: user.id,
        senderType: 'bot',
        text: sentence,
      };
      
      sendBotMessage({ chatId: randomChat.id, message });
    };

    const getRandomInterval = () => 10000 + Math.random() * 5000;
    
    let timeoutId: ReturnType<typeof setTimeout>;
    
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        sendRandomMessage();
        scheduleNext();
      }, getRandomInterval());
    };
    
    scheduleNext();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [enabled, chats, users, sendBotMessage, queryClient]);
}
