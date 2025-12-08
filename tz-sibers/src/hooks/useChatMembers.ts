import { useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeUserFromChat } from '../api/query';
import { useChat } from '../contexts/ChatContext';
import type { Chat, UserPreview } from '../types/types';

interface UseChatMembersResult {
  members: UserPreview[];
  removeMember: (memberId: number) => void;
}

export function useChatMembers(selectedChat?: Chat): UseChatMembersResult {
  const queryClient = useQueryClient();
  const { selectedChatId } = useChat();

  const members = useMemo(() => {
    if (!selectedChat?.members) return [];
    return selectedChat.members.filter(
      (m, idx, arr) => arr.findIndex(x => x.id === m.id) === idx
    );
  }, [selectedChat]);

  const { mutate: removeMemberMutation } = useMutation({
    mutationFn: (memberId: number) => removeUserFromChat(selectedChatId!, memberId),
    onSuccess: (memberId) => {
      queryClient.setQueryData<Chat[]>(['chats'], (old) => {
        if (!old) return old;
        return old.map(chat =>
          chat.id === selectedChatId
            ? { ...chat, members: (chat.members || []).filter(m => m.id !== memberId) }
            : chat
        );
      });
    },
  });

  const removeMember = (memberId: number) => {
    if (!selectedChatId) return;
    removeMemberMutation(memberId);
  };

  return { members, removeMember };
}
