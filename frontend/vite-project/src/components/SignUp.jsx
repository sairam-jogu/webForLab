import React, { useState } from 'react'
import '../App.css';
import axios from 'axios';

const SignUp = () => {

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [passowrd, setPassword] = useState("");
  
    const eventSubmit = async (e) => {
      e.preventDefault();
      console.log(userName + " " + email + " " + passowrd);
      const User = await axios.post('http://localhost:3000/signup', {
        name:userName,
        email:email,
        password:passowrd
      })
  
      if(User.status === 200){
        const token = await User.data;
        console.log(token);
        localStorage.setItem("user",JSON.stringify(token))
      }
  
      setEmail("");
      setUserName("");
      setPassword("");
    }

  return (
    <div>
      <div>
        <form onSubmit={eventSubmit}>
          <div className='form-class'>
            <h1>Sign UP</h1>
            <div>
                <input type='name' value={userName} placeholder='UserName' onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
                <input type='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <input type='password' value={passowrd} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
              <div className='btn'>
                <button type='submit' value='submit'>Sign Up</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
