import { useState } from 'react'; //hook for chat creation management
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createChat } from '../api/query';
import type { Chat, UserPreview } from '../types/types';

interface UseChatCreationProps {
  selectedUsers?: UserPreview[];
  onSuccess?: () => void;
}

export function useChatCreation({ selectedUsers, onSuccess }: UseChatCreationProps = {}) {
  const [isChatCreated, setIsChatCreated] = useState<boolean>(false);
  const [chatName, setChatName] = useState<string>('');
  const queryClient = useQueryClient();

  const { mutate: createChatMutate } = useMutation({
    mutationFn: createChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      console.log('New chat created');
      setIsChatCreated(false);
      setChatName('');
      onSuccess?.();
    },
  });

  const handleCreateChat = () => {
    if (selectedUsers && selectedUsers.length > 0) {
      console.log('Creating chat with users:', selectedUsers);
      setIsChatCreated(true);
    }
  };

  const handleConfirm = (newChat: Chat) => {
    createChatMutate(newChat);
  };

  return {
    isChatCreated,
    chatName,
    setChatName,
    handleCreateChat,
    handleConfirm,
  };
}