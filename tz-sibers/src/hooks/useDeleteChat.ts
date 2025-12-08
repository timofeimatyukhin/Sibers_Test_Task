import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteChat } from '../api/query';
import { useChat } from '../contexts/ChatContext';
import type { Chat } from '../types/types';

interface UseDeleteChatResult {
  isConfirmOpen: boolean;
  openConfirm: () => void;
  confirmDelete: () => void;
  cancelConfirm: () => void;
  canDelete: boolean;
}

export function useDeleteChat(): UseDeleteChatResult {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { selectedChatId, clearSelectedChat } = useChat();
  const queryClient = useQueryClient();

  const { mutate: removeChat } = useMutation({
    mutationFn: (chatId: number) => deleteChat(chatId),
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Chat[]>(['chats'], (old) => {
        if (!old) return old;
        return old.filter((chat) => chat.id !== deletedId);
      });
      clearSelectedChat();
      setIsConfirmOpen(false);
    },
  });

  const openConfirm = () => {
    if (!selectedChatId) return;
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedChatId) return;
    removeChat(selectedChatId);
  };

  const cancelConfirm = () => setIsConfirmOpen(false);

  return {
    isConfirmOpen,
    openConfirm,
    confirmDelete,
    cancelConfirm,
    canDelete: !!selectedChatId,
  };
}
