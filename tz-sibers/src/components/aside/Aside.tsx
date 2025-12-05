import React, { useEffect, useMemo } from 'react';
import styles from './aside.module.css';
import { useState } from 'react';
import { InView } from 'react-intersection-observer';
import type { User, UserPreview } from '../../types/types';
import UserItem from '../userItem/UserItem';
import AsideUsersList from '../asideUsersList/AsideUsersList';
import type { Chat } from '../../types/types';
import { chatList } from '../../types/chats';

interface AsideProps {
  usersData: User[];  //i`ll use not all fields from User type, only id, name and avatar
  handleSetIsAnyChats: (value: boolean) => void;
  isAnyChats: boolean;
}

const Aside: React.FC<AsideProps> = ({ usersData, handleSetIsAnyChats, isAnyChats }) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isModalHovered, setIsModalHovered] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>(''); //for filtering users by name
  const [selectedUsers, setSelectedUsers] = useState<UserPreview[]>([]); //to store selected users for new chat
  const [isChatCreated, setIsChatCreated] = useState<boolean>(false); //to track if chat is created
  const [chats, setChats] = useState<Chat[]>(chatList); //to store created chats
  const [chatName, setChatName] = useState<string>(''); //to store the name of the new chat

  const handlerUserSelect = ( user: UserPreview) => {
    setIsChatCreated(false);
    setSelectedUsers((prevSelected) => { return [...prevSelected, user]; });
  }

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


  const handleCreateChat = () => {
    // Function to handle creating a new chat with selected users
    if (selectedUsers.length > 0) {
      console.log('Creating chat with users:', selectedUsers);
      setIsChatCreated(true);
    }
  }

  const handleConfirm = (newChat: Chat) => {
    setChats(prevChats => [...prevChats, newChat]);
    console.log('New chat created:', newChat);
    setIsChatCreated(false);
    setIsModalOpened(false);
    chatList.push(newChat); // Update the original chatList for side bar list
    handleSetIsAnyChats(true); // Notify parent component that a chat has been created
    setSelectedUsers([]); // Reset selected users after creating chat
    setChatName('');
  }

  return ( 
    <section className={styles.aside}>
      <div className={styles.aside__header}>
        <input className={styles.aside__search_line} type="text" placeholder='Search'/>
        <button className={isModalOpened && !isChatCreated ? styles.aside__close_btn : styles.aside__newChat_btn} onClick={toggleModalOpen}></button>
      </div>
      <div 
      className={ isModalHovered ? styles.aside__modal_hover : styles.aside__modal} 
      style={{visibility: isModalOpened && !isChatCreated ? 'visible' : 'hidden'}}
      onMouseEnter={toggleModalHover}
      onMouseLeave={toggleModalHover}
      >
        <div className={styles.aside__modal_header}>
          <span className={styles.aside__modal_title}>Choose persons you want to add to new chat</span>
          <input className={styles.aside__search_line} value={searchQuery} onChange={handleSearchChange} style={{ marginLeft: '0px', marginTop: '10px', backgroundColor: 'rgba(119, 122, 141, 0.98)', width: '100%', color: '#c1c8eb' }} type="text" placeholder='Enter name' />
        </div>
        <ul className={styles.aside__userList}>
          {visibleUsers.map((user: User) => (
            <UserItem onSendData={handlerUserSelect} key={user.id} user={user} isChatCreated={isChatCreated}/>
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
      <button className={styles.aside__modal_btn} onClick={handleCreateChat} style={{ visibility: isModalOpened && !isChatCreated ? 'visible' : 'hidden' }} >Create</button>
      <div className={styles.aside__nameChat} style={{ visibility: isChatCreated ? 'visible' : 'hidden' }}>
        <h2 className={styles.aisde__nameChat_header}>Name your chat</h2>
        <input className={styles.aside__search_line} type="text" placeholder='Enter name of your chat' value={chatName} onChange={(e) => setChatName(e.target.value)} />
        <button className={styles.aside__nameChat_btn} onClick={() => handleConfirm({ id: Date.now(), name: chatName, members: selectedUsers })}>Confirm</button>
      </div>
      <AsideUsersList isAnyChats={isAnyChats} />
    </section>
  );
}

export default Aside;