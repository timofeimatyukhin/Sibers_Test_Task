import  React from 'react';
import styles from './header.module.css';
import BtnBox from '../btnBox/BtnBox';

interface HeaderProps {
  
}

const Header: React.FC<HeaderProps> = () => {
  return ( 
    <div className={styles.header__box}>
      <span className={styles.header__name}>Username</span>
      <BtnBox />
    </div>
  );
}

export default Header;