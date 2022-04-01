import {React, useState, useRef} from 'react';
import Profile from './Profile';

function Login() {
    const [, setStarted] = useState(false);
    const start = useRef(false);
    const userName = useRef('');
    const userPass = useRef('');
    function handleUser(e)  {
        userName.current = e.target.value;
    }
      function handleUserPass(e)   {
        userPass.current = e.target.value;
    }

    function handleFormSubmit(e) {
        if (/^[a-z0-9A-Z ]+$/.test(userName.current)) {
            setStarted(true); 
            start.current = true;
        } else {
          alert("must fill all values properly and alphanumerically");
        }
      }

if(!start.current){
    return(
        <div>
        <h1>Login</h1>
        <label>
            Full Name: <input name="user" onChange={handleUser}/>
        </label>
        <label>
            Password: <input name="password" onChange={handleUserPass}/>
        </label>
        <button type="submit" onClick={handleFormSubmit}>login</button>
        </div>
    )
}

  return (
    <div className="Profile">
    <Profile />
    </div>
  );
}

export default Login;
