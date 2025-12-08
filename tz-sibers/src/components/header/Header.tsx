import  React from 'react';
import styles from './header.module.css';
import BtnBox from '../btnBox/BtnBox';
import type { Chat } from '../../types/types';
import { useChatMembers } from '../../hooks/useChatMembers';

interface HeaderProps {
  isAnyChats: boolean;
  selectedChat?: Chat;  
}

const Header: React.FC<HeaderProps> = ({ isAnyChats, selectedChat }) => {
  const { members, removeMember } = useChatMembers(selectedChat);

  return ( 
    <div className={styles.header__box} style={{display: isAnyChats && selectedChat ? 'flex' : 'none'}}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__avatar}></div>
        <div className={styles.header__info}>
          <span className={styles.header__name}>{selectedChat?.name || 'Chat'}</span>
          <ul className={styles.header__members}>
            {members.map(member => (
              <li key={member.id} className={styles.memberItem}>
                <span>{member.name}</span>
                <button 
                  className={styles.removeBtn}
                  onClick={() => removeMember(member.id)}
                  title="Remove user"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <BtnBox />
    </div>
  );
}

export default Header;