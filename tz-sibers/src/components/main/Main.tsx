import React from "react";
import Header from "../header/Header";
import ChatBox from "../chatBox/ChatBox";
import MessageLine from "../messageLine/MessageLine";
import styles from "./main.module.css";

interface MainProps {
  
}

const Main: React.FC<MainProps> = () => {
  return ( 
    <section className={styles.main}>
      <Header />
      <ChatBox />
      <MessageLine />
    </section>
  );
}

export default Main;