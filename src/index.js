import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './Store/UserStore';
import Header from './Component/Header';

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    <BrowserRouter>
      <Header />
      <App />
    </BrowserRouter>
  </Context.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
