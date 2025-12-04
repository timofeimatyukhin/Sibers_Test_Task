import React, { useEffect, useMemo } from 'react';
import styles from './aside.module.css';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';
import type { User } from '../../types/types';

interface AsideProps {
  usersData: User[];  //we`ll use not all fields from User type, only id, name and avatar
}

const Aside: React.FC<AsideProps> = ({ usersData }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isModalHovered, setIsModalHovered] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>(''); //for filtering users by name

  const filteredUsers = useMemo(() => {
    if(!searchQuery.trim()) return usersData;
    
    return usersData.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) //filtered users
    );
  }, [searchQuery, usersData]);

  const visibleUsers = useMemo(() => {
    return filteredUsers.slice(0, visibleCount); //filtered AND visible users
  }, [filteredUsers, visibleCount]);


  useEffect(() => { //here we reset visibleCount when usersData changes
    setVisibleCount(Math.min(10, filteredUsers.length));
  }, [filteredUsers]);


  const toggleModalOpen = () => {
    setIsModalOpened(prev => !prev); //function to open/close modal
  }

  const toggleModalHover = () => {
    setIsModalHovered(prev => !prev); //function to add hover effect to modal
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); //function to handle search input change
  }


  return ( 
    <section className={styles.aside}>
      <div className={styles.aside__header}>
        <input className={styles.aside__search_line} type="text" placeholder='Search'/>
        <button className={isModalOpened ? styles.aside__close_btn : styles.aside__newChat_btn} onClick={toggleModalOpen}></button>
      </div>
      <div 
      className={ isModalHovered ? styles.aside__modal_hover : styles.aside__modal} 
      style={{visibility: isModalOpened ? 'visible' : 'hidden'}}
      onMouseEnter={toggleModalHover}
      onMouseLeave={toggleModalHover}
      >
        <div className={styles.aside__modal_header}>
          <span className={styles.aside__modal_title}>Choose persons you want to add to new chat</span>
          <input className={styles.aside__search_line} value={searchQuery} onChange={handleSearchChange} style={{ marginLeft: '0px', marginTop: '10px', backgroundColor: 'rgba(119, 122, 141, 0.98)', width: '100%', color: '#c1c8eb' }} type="text" placeholder='Enter name' />
        </div>
        <ul className={styles.aside__userList}>
          {visibleUsers.map((user: User) => (
            <>
              <button className={styles.aside__userListItem} key={user.id}>
                <img className={styles.aside__modal_avatar} src={user.avatar} alt="avatar" loading='lazy'/>
                <span className={styles.aside__modal_name}>{user.name}</span>
              </button>
              <hr className={styles.aside__modal_customLine}/>
            </>
          ))}
          <span className={styles.aside__noResults} style={{ visibility: ( visibleUsers.length === 0 ) ? "visible" : "hidden"}}>No users found</span>
          {visibleCount < usersData.length && (
            <InView as="span" //here we use InView component to implement infinite scroll
              onChange={(inView: boolean) => {
                if (inView) {
                  setVisibleCount((prevCount) => Math.min(prevCount + 10, usersData.length));
                }
              }}
              threshold={0.1}
            >
              <span className={styles.aside__loading}></span>
            </InView> //it let us load users by parts (10 users per load)
            )}
        </ul>
      </div>
      <ul className={styles.aside__userList}></ul>
    </section>
  );
}

export default Aside;