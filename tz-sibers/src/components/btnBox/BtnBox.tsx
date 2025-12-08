import React from 'react';
import modalStyles from '../createChatModal/createChatModal.module.css';
import styles from './btnBox.module.css';
import { useDeleteChat } from '../../hooks/useDeleteChat';
import { useAddUserToChat } from '../../hooks/useAddUserToChat';

const BtnBox: React.FC = () => {
  const { isConfirmOpen, openConfirm, confirmDelete, cancelConfirm, canDelete } = useDeleteChat();
  const {
    isOpen: isAddOpen,
    buttonRef,
    searchQuery,
    handleSearchChange,
    availableUsers,
    openModal,
    handleAdd,
    canOpen,
  } = useAddUserToChat();

  return ( 
    <>
      <div className={styles.btnBox}>
        <button className={styles.btnBox__searchBtn}></button>
        <button 
          ref={buttonRef}
          className={styles.btnBox__addPersonBtn}
          onClick={openModal}
          disabled={!canOpen}
          title={!canOpen ? 'Select chat to add user' : 'Add user'}
        ></button>
        <button 
          className={styles.btnBox__deleteBtn}
          onClick={openConfirm}
          disabled={!canDelete}
          title={!canDelete ? 'Select chat to delete' : 'Delete chat'}
        ></button>
      </div>

      {isConfirmOpen && (
        <div className={modalStyles.aside__nameChat}>
          <h2 className={modalStyles.aside__nameChat_header}>Delete chat?</h2>
          <p style={{ textAlign: 'center', color: '#c1c8eb' }}>This action is permanent and cannot be undone.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className={modalStyles.aside__nameChat_btn} onClick={confirmDelete}>Delete</button>
            <button className={modalStyles.aside__nameChat_btn} onClick={cancelConfirm}>Cancel</button>
          </div>
        </div>
      )}

      {isAddOpen && (
        <div 
          className={styles.aside__modal}
        >
          <div className={styles.aside__modal_header}>
            <span className={styles.aside__modal_title}>Add user to chat</span>
            <input
              className={styles.aside__search_line}
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              type="text"
              placeholder="Enter name"
            />
          </div>
          <ul className={styles.aside__userList}>
            {availableUsers.map((user) => (
              <li
                key={user.id}
                style={{ color: '#c1c8eb', padding: '8px 4px', cursor: 'pointer' }}
                onClick={() => handleAdd(user)}
              >
                {user.name}
              </li>
            ))}
            <span
              className={styles.aside__noResults}
              style={{ visibility: availableUsers.length === 0 ? 'visible' : 'hidden' }}
            >
              No users found
            </span>
          </ul>
        </div>
      )}
    </>
  );
}

export default BtnBox;