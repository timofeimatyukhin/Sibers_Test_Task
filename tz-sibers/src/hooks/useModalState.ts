import { useState } from 'react';

export function useModalState() { //hook for modal state management
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isModalHovered, setIsModalHovered] = useState<boolean>(false);

  const toggleModalOpen = () => {
    setIsModalOpened(prev => !prev);
  };

  const toggleModalHover = () => {
    setIsModalHovered(prev => !prev);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  return {
    isModalOpened,
    isModalHovered,
    toggleModalOpen,
    toggleModalHover,
    closeModal,
  };
}