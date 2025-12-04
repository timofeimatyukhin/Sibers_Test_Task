import type React from "react";
import styles from './messageLine.module.css';

interface MessageLineProps {
  
}

const MessageLine: React.FC<MessageLineProps> = () => {
  return ( 
    <div className={styles.messageLine}>
      <input className={styles.messageLine__input} type="text" placeholder="Type text here"/>
      <button className={styles.messageLine__sendBtn}></button>
    </div>
  );
}

export default MessageLine;