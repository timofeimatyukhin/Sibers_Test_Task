import React from 'react';
import styles from './btnBox.module.css';

interface BtnBoxProps {
  
}

const BtnBox: React.FC<BtnBoxProps> = () => {
  return ( 
    <div className={styles.btnBox}>
      <button className={styles.btnBox__searchBtn}></button>
      <button className={styles.btnBox__addPersonBtn}></button>
      <button className={styles.btnBox__deleteBtn}></button>
    </div>
  );
}

export default BtnBox;