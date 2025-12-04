import Aside from './components/aside/Aside';
import Main from './components/main/Main';
import usersData from './data/users.json';
import type { User } from './types/types';


function App() {

  const typedUsersData = usersData as User[];  //convert first data to User type


  return (
    <>
      <Aside usersData={typedUsersData} /> {/* pass users data as prop */}
      <Main />
    </>
  )
}

export default App
