import React from 'react';
import styles from './asideUsersList.module.css';
import type { Chat } from '../../types/types';
import { useChat } from '../../hooks/useChat';


interface AsideUsersListProps {
  isAnyChats: boolean;
  chats: Chat[];
}

const AsideUsersList: React.FC<AsideUsersListProps> = ({ isAnyChats, chats }) => {
  const { selectedChatId, selectChat } = useChat();

  if (isAnyChats && chats.length > 0) {
    return ( 
    <ul className={styles.aside__usersList}>
      {chats.map((chat: Chat) => (
        <li className={[styles.aside__chatItem, selectedChatId === chat.id ? styles.aside__chatItem_active : ''].join(' ')}
          key={chat.id}
          onClick={() => selectChat(chat.id)}
        >
          <div className={styles.aside__chatAvatar}></div>
          <span className={styles.aside__chatName}>
            <h3>
              {chat.name}
            </h3>
            <br></br>
            <p>
              {chat.members.map(member => member.name).join(', ')}
            </p>
          </span>
        </li>
      ))}
    </ul>
  );}
  return <p className={styles.aside__noChats}>No chats found</p>;
}

export default AsideUsersList;