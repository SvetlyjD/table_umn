import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Routes, Route } from "react-router-dom"
import { Context } from '.';
import Account from './Account';
import './App.css';
import Auth from './Auth';
import Main from './Main';
import SignUp from './SignUp';

const App = observer(() => {
  const { user } = useContext(Context)
  let c = localStorage.getItem("token");
  if (c) {
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
})

export default App;
