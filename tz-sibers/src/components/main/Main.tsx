import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchChats } from "../../api/query";
import { useChat } from "../../contexts/ChatContext";
import { useBotMessages } from "../../hooks/useBotMessages";
import Header from "../header/Header";
import ChatBox from "../chatBox/ChatBox";
import MessageLine from "../messageLine/MessageLine";
import styles from "./main.module.css";
import type { Chat, User } from "../../types/types";

interface MainProps {
  isAnyChats: boolean;
  usersData: User[];
}

const Main: React.FC<MainProps> = ( { isAnyChats, usersData } ) => {
  const { selectedChatId } = useChat();
  
  const { data: chats = [] } = useQuery({
    queryKey: ['chats'],
    queryFn: fetchChats,
  });
  
  const selectedChat = chats.find((chat: Chat) => chat.id === selectedChatId);

  useBotMessages({
    chats,
    users: usersData,
    enabled: isAnyChats,
  });

  return ( 
    <section className={styles.main}>
      <Header selectedChat={selectedChat} isAnyChats={isAnyChats} />
      <ChatBox selectedChat={selectedChat} isAnyChats={isAnyChats} usersData={usersData} />
      <MessageLine isAnyChats={isAnyChats} />
    </section>
  );
}

export default Main;