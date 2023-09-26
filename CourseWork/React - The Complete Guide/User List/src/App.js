import React, { useState } from 'react';
import AddUser from './components/Users/AddUser';
import UserList from './components/Users/UserList';

function App() {
  const [userList, setUserList] = useState([]);

  const updateUserListHandler = (name, age) => {
    setUserList(prevUserList => [
      { 
        id: Math.random().toString(),
        username: name,
        age : age
      }, ...prevUserList
    ]);
  }

  return (
    <div>
      <AddUser onAddUser={updateUserListHandler}/>
      <UserList users={userList}/>
    </div>
  );
}

export default App;
