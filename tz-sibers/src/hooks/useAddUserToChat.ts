import { useMemo, useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usersData from '../data/users.json';
import { useChat } from '../contexts/ChatContext';
import { addUserToChat } from '../api/query';
import type { Chat, User } from '../types/types';

interface ModalPosition {
  top: number;
}

interface UseAddUserToChatResult {
  isOpen: boolean;
  modalPosition: ModalPosition;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  searchQuery: string;
  handleSearchChange: (value: string) => void;
  availableUsers: User[];
  openModal: () => void;
  closeModal: () => void;
  handleAdd: (user: User) => void;
  canOpen: boolean;
}

export function useAddUserToChat(): UseAddUserToChatResult {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { selectedChatId } = useChat();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState<ModalPosition>({ top: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  const chats = queryClient.getQueryData<Chat[]>(['chats']) || [];
  const selectedChat = chats.find(c => c.id === selectedChatId);

  const availableUsers = useMemo(() => {
    if (!selectedChat) return [];
    const membersIds = new Set(selectedChat?.members?.map(m => m.id) || []);
    return (usersData as User[])
      .filter(u => !membersIds.has(u.id))
      .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [selectedChat, searchQuery]);

  const { mutate: addUser } = useMutation({
    mutationFn: ({ chatId, user }: { chatId: number; user: User }) => addUserToChat(chatId, user),
    onSuccess: (chatId, variables) => {
      queryClient.setQueryData<Chat[]>(['chats'], (old) => {
        if (!old) return old;
        return old.map(chat =>
          chat.id === chatId
            ? { ...chat, members: [...(chat.members || []), { id: variables.user.id, name: variables.user.name }] }
            : chat
        );
      });
      setIsOpen(false);
    },
  });

  const openModal = () => {
    if (!selectedChatId) return;
    // toggle behavior: if already open, close
    if (isOpen) {
      setIsOpen(false);
      return;
    }
    const rect = buttonRef.current?.getBoundingClientRect();
    const top = (rect?.bottom ?? 0) + 8 + window.scrollY;
    setModalPosition({ top });
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleAdd = (user: User) => {
    if (!selectedChatId) return;
    addUser({ chatId: selectedChatId, user });
  };

  return {
    isOpen,
    modalPosition,
    buttonRef,
    searchQuery,
    handleSearchChange: setSearchQuery,
    availableUsers,
    openModal,
    closeModal,
    handleAdd,
    canOpen: !!selectedChatId,
  };
}
