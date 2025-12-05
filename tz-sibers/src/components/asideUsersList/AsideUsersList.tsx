import React from 'react';
import styles from './asideUsersList.module.css';
import type { Chat } from '../../types/types';
import { chatList } from '../../types/chats';


interface AsideUsersListProps {
  isAnyChats: boolean;
}

const AsideUsersList: React.FC<AsideUsersListProps> = ({ isAnyChats }) => {
  if (isAnyChats) {return ( 
    <ul className={styles.aside__usersList}>
      {chatList.map((chat: Chat) => (
        <li className={styles.aside__chatItem} key={chat.id}>
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