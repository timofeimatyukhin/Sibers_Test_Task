import type React from "react";
import { useMessageLine } from "../../hooks/useMessageLine";
import styles from './messageLine.module.css';

interface MessageLineProps {
  isAnyChats: boolean;
}

const MessageLine: React.FC<MessageLineProps> = ({ isAnyChats }) => {
  const { inputRef, handleSend, handleKeyPress, isVisible } = useMessageLine({ isAnyChats });

  return ( 
    <div className={styles.messageLine} style={{display: isVisible ? "flex" : "none"}}>
      <input 
        ref={inputRef}
        className={styles.messageLine__input} 
        type="text" 
        placeholder="Type text here"
          onKeyDown={handleKeyPress}
      />
      <button 
        className={styles.messageLine__sendBtn}
        onClick={handleSend}
      ></button>
    </div>
  );
}

export default MessageLine;