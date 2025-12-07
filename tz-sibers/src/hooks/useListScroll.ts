import { useState, useEffect, useMemo } from 'react'; //hook for scroll functionality
import type { User } from '../types/types';

export function useListScroll(filteredUsers: User[], initialCount = 10) {
  const [visibleCount, setVisibleCount] = useState<number>(initialCount);

  const visibleUsers = useMemo(() => {
    return filteredUsers.slice(0, visibleCount);
  }, [filteredUsers, visibleCount]);

  useEffect(() => {
    setVisibleCount(Math.min(initialCount, filteredUsers.length));
  }, [filteredUsers, initialCount]);

  return {
    visibleCount,
    visibleUsers,
    setVisibleCount,
  };
}