import  React from 'react';
import styles from './header.module.css';
import BtnBox from '../btnBox/BtnBox';
import type { Chat } from '../../types/types';

interface HeaderProps {
  isAnyChats: boolean;
  selectedChat?: Chat;  
}

const Header: React.FC<HeaderProps> = ({ isAnyChats, selectedChat }) => {
  const uniqueMembers = selectedChat?.members
    ? selectedChat.members.filter((m, idx, arr) => arr.findIndex(x => x.id === m.id) === idx)
    : [];

  return ( 
    <div className={styles.header__box} style={{display: isAnyChats && selectedChat ? 'flex' : 'none'}}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__avatar}></div>
        <div className={styles.header__info}>
          <span className={styles.header__name}>{selectedChat?.name || 'Chat'}</span>
          <ul className={styles.header__members}>
            {uniqueMembers.map(member => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <BtnBox />
    </div>
  );
}

export default Header;