import type React from "react";
import styles from './messageLine.module.css';

interface MessageLineProps {
  isAnyChats: boolean;
}

const MessageLine: React.FC<MessageLineProps> = ({ isAnyChats }) => {
  return ( 
    <div className={styles.messageLine} style={{display: isAnyChats ? "flex" : "none"}}>
      <input className={styles.messageLine__input} type="text" placeholder="Type text here"/>
      <button className={styles.messageLine__sendBtn}></button>
    </div>
  );
}

export default MessageLine;