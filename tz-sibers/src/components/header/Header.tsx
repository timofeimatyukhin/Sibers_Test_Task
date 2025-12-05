import  React from 'react';
import styles from './header.module.css';
import BtnBox from '../btnBox/BtnBox';

interface HeaderProps {
  isAnyChats: boolean;
}

const Header: React.FC<HeaderProps> = ({ isAnyChats }) => {
  return ( 
    <div className={styles.header__box} style={{display: isAnyChats ? 'flex' : 'none'}}>
      <span className={styles.header__name}>Username</span>
      <BtnBox />
    </div>
  );
}

export default Header;