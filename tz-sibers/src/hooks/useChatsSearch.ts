import { useState, useMemo } from 'react'; //hook for chat search functionality
import type { Chat } from '../types/types';

export function useChatsSearch(chatsData: Chat[]) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chatsData;
    return chatsData.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, chatsData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return {
    searchQuery,
    filteredChats,
    handleSearchChange,
  };
}