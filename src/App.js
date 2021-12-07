import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom"
import { Context } from '.';
import Account from './Account';
import './App.css';
import Auth from './Auth';
import Main from './Main';
import SignUp from './SignUp';

function App() {
  const { user } = useContext(Context)
  if (user.isAuth) {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/Auth" element={<Auth />} />
          <Route exact path="/account" element={<Account />} />
        </Routes>
      </div>)
  }

  return (
    <div>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/Auth" element={<Auth />} />
      </Routes>
    </div>)
}

export default App;
