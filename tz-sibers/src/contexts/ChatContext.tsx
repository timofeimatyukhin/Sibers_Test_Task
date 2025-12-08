import React, { createContext, useContext, useState } from 'react';

type ChatContextType = {
  selectedChatId: number | null;
  selectChat: (chatId: number) => void;
  clearSelectedChat: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);

  const selectChat = (chatId: number) => {
    setSelectedChatId(chatId);
  }

  const clearSelectedChat = () => {
    setSelectedChatId(null);
  }

  return (
    <ChatContext.Provider value={{ selectedChatId, selectChat, clearSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}