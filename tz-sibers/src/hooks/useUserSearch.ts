import { useState, useMemo } from 'react'; //hook for user search functionality
import type { User } from '../types/types';

export function useUserSearch(usersData: User[]) {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return usersData;
    return usersData.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, usersData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return {
    searchQuery,
    filteredUsers,
    handleSearchChange,
  };
}