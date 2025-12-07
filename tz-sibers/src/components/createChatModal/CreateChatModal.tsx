import React from 'react';
import styles from './createChatModal.module.css';
import type { User, UserPreview } from '../../types/types';
import UserItem from '../userItem/UserItem';
import InViewComponent from '../inView/InViewComponent';

interface CreateChatModalProps {
  isModalOpened: boolean;
  isModalHovered: boolean;
  isChatCreated: boolean;
  toggleModalHover: () => void;
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visibleUsers: User[];
  handlerUserSelect: (user: UserPreview) => void;
  visibleCount: number;
  filteredUsers: User[];
  setVisibleCount: (value: number | ((prevCount: number) => number)) => void;
  handleCreateChat: () => void;
  chatName: string;
  setChatName: (name: string) => void;
  selectedUsers: UserPreview[];
  handleConfirm: (chat: any) => void;
}

const CreateChatModal: React.FC<CreateChatModalProps> = ({
  isModalOpened,
  isModalHovered,
  isChatCreated,
  toggleModalHover,
  searchQuery,
  handleSearchChange,
  visibleUsers,
  handlerUserSelect,
  visibleCount,
  filteredUsers,
  setVisibleCount,
  handleCreateChat,
  chatName,
  setChatName,
  selectedUsers,
  handleConfirm,
}) => {
  return ( 
    <p>
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
            <InViewComponent visibleCount={visibleCount} totalUsersCount={filteredUsers.length} setVisibleCount={setVisibleCount} />
          </ul>
      </div>
        <button className={styles.aside__modal_btn} onClick={handleCreateChat} style={{ visibility: isModalOpened && !isChatCreated ? 'visible' : 'hidden' }} >Create</button>
        <div className={styles.aside__nameChat} style={{ visibility: isChatCreated ? 'visible' : 'hidden' }}>
          <h2 className={styles.aside__nameChat_header}>Name your chat</h2>
          <input className={styles.aside__search_line} type="text" placeholder='Enter name of your chat' value={chatName} onChange={(e) => setChatName(e.target.value)} />
          <button className={styles.aside__nameChat_btn} onClick={() => handleConfirm({ id: Date.now(), name: chatName, members: selectedUsers })}>Confirm</button>
        </div>
    </p>
  );
}

export default CreateChatModal;