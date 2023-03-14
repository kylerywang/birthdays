import './App.css';
import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import * as friendsAPI from '../../utilities/friends-api'
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar'
import Friends from '../Friends/Friends';

export default function App() {
  const [ user, setUser ] = useState(getUser())
  const [ friends, setFriends ]= useState([])

  return (
    <main>
      <div className="max-w-2xl mx-auto bg-white">
        {
          user ?
          <>
            <NavBar user={user} setUser={setUser}/>
            <Routes>
              <Route path="/friends" element={<Friends friends={friends} setFriends={setFriends} user={user}/>} />
              <Route path="/*" element={<Navigate to="/friends"/>}/>
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
        }
      </div>
    </main>
  );
}


