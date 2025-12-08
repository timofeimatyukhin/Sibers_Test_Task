import React from 'react';
import styles from './chatBox.module.css';
import { useChatBox } from '../../hooks/useChatBox';
import type { Chat, User } from '../../types/types';

interface ChatBoxProps {
  isAnyChats: boolean;
  selectedChat?: Chat;
  usersData?: User[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ isAnyChats, selectedChat, usersData = [] }) => {
  const { state, messages, messagesEndRef } = useChatBox({ isAnyChats, selectedChat, usersData });

  if (state === 'messages') {
    return (
      <section className={styles.chatBox}>
        <div className={styles.messagesContainer}>
          {messages.map((msg) => (
            <div key={msg.id} className={styles.messageWrapper}>
              <img 
                src={msg.avatar} 
                alt={msg.senderName}
                className={styles.avatar}
              />
              <div className={styles.chatBox__messageBox}>
                <p className={styles.messageSender}>{msg.senderName}</p>
                <p className={styles.messageText}>{msg.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </section>
    );
  }

  if (state === 'chatEmpty') {
    return (
      <section className={styles.chatBox_empty}>
        <span className={styles.chatBox__alarm}>Start messaging</span>
      </section>
    );
  }

  if (state === 'selectChat') {
    return (
      <section className={styles.chatBox_empty}>
        <span className={styles.chatBox__alarm}>Select a chat to view messages</span>
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