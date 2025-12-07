import { useState } from 'react'; //hook for user selection management
import type { UserPreview } from '../types/types';

export function useUserSelection() {
  const [selectedUsers, setSelectedUsers] = useState<UserPreview[]>([]);

  const addUser = (user: UserPreview) => {
    setSelectedUsers(prev => [...prev, user]);
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  return {
    selectedUsers,
    addUser,
    clearSelection,
  };
}