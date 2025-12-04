import React from 'react';
import styles from './chatBox.module.css';

interface ChatBoxProps {
  
}

const ChatBox: React.FC<ChatBoxProps> = () => {
  return ( 
    <section className={styles.chatBox_empty}>
      <span className={styles.chatBox__alarm}>Start messaging</span>
    </section>
  );
}

export default ChatBox;