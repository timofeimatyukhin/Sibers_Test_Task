import React, { useState } from 'react';
import styles from './userItem.module.css';
import type { User, UserPreview } from '../../types/types';

interface UserItemProps {
  user: User;
  onSendData: (user: UserPreview) => void;
  isChatCreated: boolean;
}

const UserItem: React.FC<UserItemProps> = ({ user, onSendData, isChatCreated }: UserItemProps) => {
  const [isCheckedState, setIsCheckedState] = useState<boolean>(false);


  if (isChatCreated && isCheckedState) { //for reset checkbox state when chat is created
    setIsCheckedState(prev => !prev);
  }
  
  const handleCheckboxChange = () => {
    setIsCheckedState(prev => !prev);
    if (!isCheckedState) onSendData({id: user.id, name: user.name});
  }

  return ( 
    <>
      <div className={styles.aside__checkboxItemBlock}>
        <label className={styles.aside__custom_checkboxItem}>
          <input  
          className={styles.aside__real_checkboxItem}  //ill hide this default checkbox and style a fake one
          type="checkbox" 
          checked={isCheckedState} 
          onChange={() => {}}
          onClick={(e) => e.preventDefault()} //to prevent checkbox state change on click
          ></input>
          <div className={isCheckedState && !isChatCreated ? styles.aside__fake_checkboxItem_checked : styles.aside__fake_checkboxItem}></div> 
        </label>
        <button className={styles.aside__userListItem} key={user.id} onClick={handleCheckboxChange}>
          <img className={styles.aside__modal_avatar} src={user.avatar} alt="avatar" loading='lazy' />
          <span className={styles.aside__modal_name}>{user.name}</span>
        </button>
      </div>
      <hr className={styles.aside__modal_customLine} />
    </>
  );
}

export default UserItem;