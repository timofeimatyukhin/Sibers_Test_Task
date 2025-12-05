import React from "react";
import Header from "../header/Header";
import ChatBox from "../chatBox/ChatBox";
import MessageLine from "../messageLine/MessageLine";
import styles from "./main.module.css";

interface MainProps {
  isAnyChats: boolean;
}

const Main: React.FC<MainProps> = ( { isAnyChats } ) => {
  return ( 
    <section className={styles.main}>
      <Header isAnyChats={isAnyChats} />
      <ChatBox isAnyChats={isAnyChats} />
      <MessageLine isAnyChats={isAnyChats} />
    </section>
  );
}

export default Main;