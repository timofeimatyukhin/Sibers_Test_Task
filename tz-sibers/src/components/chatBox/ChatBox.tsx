import React from 'react';
import styles from './chatBox.module.css';

interface ChatBoxProps {
  isAnyChats: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ isAnyChats }) => {
  if (isAnyChats) {
    return ( 
      <section className={styles.chatBox_empty}>
        <span className={styles.chatBox__alarm}>Start messaging</span>
      </section>
    );
  }
  return ( 
    <section className={styles.chatBox_empty}>
      <span className={styles.chatBox__alarm}>Create chat to start messaging</span>
    </section>
  );
}

export default ChatBox;