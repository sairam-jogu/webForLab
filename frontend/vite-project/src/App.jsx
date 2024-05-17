import { useState } from 'react'
import './App.css'
import axios from 'axios';
import SignUp from './components/SignUp';
import Login from './components/Login';

import { BrowserRouter, Routes, Route,  } from "react-router-dom";


function App() {
  return (
    <>
      {/* <SignUp /> */}
      <BrowserRouter>
          <Routes>
              <Route path='/'>Home</Route>
              <Route path='/login'>Login</Route>
              <Route path='/signup'>Signup</Route>
          </Routes>
      </BrowserRouter>
      <Login />
    </>
  )
}

export default App
