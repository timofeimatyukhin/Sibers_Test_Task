import type React from 'react';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMessageToChat } from '../api/query';
import { useChat } from '../contexts/ChatContext';
import type { Message, Chat } from '../types/types';

interface UseMessageLineParams {
  isAnyChats: boolean;
}

interface UseMessageLineResult {
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleSend: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isVisible: boolean;
}

export function useMessageLine({ isAnyChats }: UseMessageLineParams): UseMessageLineResult {
  const inputRef = useRef<HTMLInputElement>(null);
  const { selectedChatId } = useChat();
  const queryClient = useQueryClient();

  const { mutate: sendMessage } = useMutation({
    mutationFn: ({ chatId, message }: { chatId: number; message: Message }) =>
      addMessageToChat(chatId, message),
    onSuccess: () => {
      // cache will be updated manually in handleSend
      if (inputRef.current) inputRef.current.value = '';
    },
  });

  const handleSend = () => {
    const text = inputRef.current?.value.trim();
    if (!text || !selectedChatId) return;

    const message: Message = {
      id: Date.now(),
      senderId: -1, // -1 is the current user ID
      senderType: 'user',
      text,
    };

    // optimistic cache update for immediate UI response
    queryClient.setQueryData<Chat[]>(['chats'], (old) => {
      if (!old) return old;
      return old.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...(chat.messages || []), message] }
          : chat
      );
    });

    sendMessage({ chatId: selectedChatId, message });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const isVisible = isAnyChats && !!selectedChatId;

  return { inputRef, handleSend, handleKeyPress, isVisible };
}
