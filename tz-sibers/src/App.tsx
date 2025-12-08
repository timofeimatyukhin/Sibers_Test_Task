import { useState } from 'react';
import Aside from './components/aside/Aside';
import Main from './components/main/Main';
import usersData from './data/users.json';
import type { User } from './types/types';


function App() {

  const typedUsersData = usersData as User[];  //convert first data to User type

  const [isAnyChats, setIsAnyChats] = useState<boolean>(false);

  const handleSetIsAnyChats = (value: boolean) => {
    setIsAnyChats(value);
    console.log('isAnyChats updated in App:', value);
  }

  return (
    <>
      <Aside usersData={typedUsersData} handleSetIsAnyChats={handleSetIsAnyChats} isAnyChats={isAnyChats} />
      <Main isAnyChats={isAnyChats} usersData={typedUsersData} />
    </>
  )
}

export default App
