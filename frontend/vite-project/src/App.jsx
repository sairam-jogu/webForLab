import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");

  const eventSubmit = () => {
    console.log(userName+" "+email+" "+passowrd);
  }
  
  return (
    <>
      <h1>Hello World!!</h1>
      <div>
        <form action={eventSubmit}>
          <label>UserName:
          <input type='name' value={userName} onChange={(e)=>setUserName(e.target.value)} />
          </label>
          <label>Email:
          <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
          </label>
          <label>Password:
          <input type='name' value={passowrd} onChange={(e)=>setPassword(e.target.value)} />
          </label>
          <button>Sign Up</button>
        </form>
      </div>

    </>
  )
}

export default App
