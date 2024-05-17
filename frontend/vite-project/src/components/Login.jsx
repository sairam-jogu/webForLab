import React, { useState } from 'react'
import '../App.css';
import axios from 'axios';
import AuthContext from '../AuthContexts/AuthContext';


const Login = () => {
    const [userName, setUserName] = useState("");
    const [passowrd, setPassword] = useState("");
    const [user,setUser] = useState("");

    const eventSubmit = async (e) => {
        e.preventDefault();
        const User = await axios.post('http://localhost:3000/login', {
          name:userName,
          password:passowrd
        })
    
        if(User.status === 200){
          const token = await User.data;
          console.log(token);
          localStorage.setItem("user",JSON.stringify(token))
          setUser(token);
        }
        setUserName("");
        setPassword("");
      }

  return (
    <div>
        <form onSubmit={eventSubmit}>
          <div className='form-class'>
            <h1>Log In</h1>
            <div>
                <input type='name' value={userName} placeholder='UserName' onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
                <input type='password' value={passowrd} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
              <div className='btn'>
                <button type='submit' value='submit'>Login</button>
              </div>
            </div>
          </div>
        </form>
    </div>
  )
}

export default Login
