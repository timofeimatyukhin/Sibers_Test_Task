import React from 'react';
import styles from './aside.module.css';
import { useModalState } from '../../hooks/useModalState';
import { useUserSearch } from '../../hooks/useUserSearch';
import { useListScroll } from '../../hooks/useListScroll';
import { useUserSelection } from '../../hooks/useUserSelection';
import { useChatCreation } from '../../hooks/useChatCreation';
import type { User, UserPreview } from '../../types/types';
import AsideUsersList from '../asideUsersList/AsideUsersList';
import CreateChatModal from '../createChatModal/CreateChatModal';


interface AsideProps {
  usersData: User[];  //i`ll use not all fields from User type, only id, name and avatar
  handleSetIsAnyChats: (value: boolean) => void;
  isAnyChats: boolean;
}

const Aside: React.FC<AsideProps> = ({ usersData, handleSetIsAnyChats, isAnyChats }) => {
  const {
    isModalOpened,
    isModalHovered,
    toggleModalOpen,
    toggleModalHover,
    closeModal
  } = useModalState();

  const {
    searchQuery,
    filteredUsers,
    handleSearchChange
  } = useUserSearch(usersData);

  const {
    visibleUsers,
    visibleCount,
    setVisibleCount
  } = useListScroll(filteredUsers);

  const {
    selectedUsers,
    addUser,
    clearSelection
  } = useUserSelection();

  const {
    isChatCreated,
    chatName,
    setChatName,
    handleCreateChat,
    handleConfirm
  } = useChatCreation({
    selectedUsers,
    onSuccess: () => {
      closeModal();
      handleSetIsAnyChats(true);
      clearSelection();
    },
  });

  const handlerUserSelect = (user: UserPreview) => { //wrapper for addUser function from useUserSelection hook
    addUser(user);
  };

  return ( 
    <section className={styles.aside}>
      <div className={styles.aside__header}>
        <input className={styles.aside__search_line} type="text" placeholder='Search'/>
        <button className={isModalOpened && !isChatCreated ? styles.aside__close_btn : styles.aside__newChat_btn} onClick={toggleModalOpen}></button>
      </div>
      <CreateChatModal 
        isModalOpened={isModalOpened}
        isModalHovered={isModalHovered}
        isChatCreated={isChatCreated}
        toggleModalHover={toggleModalHover}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        visibleUsers={visibleUsers}
        handlerUserSelect={handlerUserSelect}
        visibleCount={visibleCount}
        filteredUsers={filteredUsers}
        setVisibleCount={setVisibleCount}
        handleCreateChat={handleCreateChat}
        chatName={chatName}
        setChatName={setChatName}
        selectedUsers={selectedUsers}
        handleConfirm={handleConfirm}
      />
      <AsideUsersList isAnyChats={isAnyChats} />
    </section>
  );
}

export default Aside;