/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
import {
  React, useState, useRef,
} from 'react';
import '../assets/Login.css';
import { getLoginTrue, getPasswordTrue } from '../modules/api';
import Profile from './Profile';
import Signup from './Signup';
import Lockout from './Lockout';

function Login() {
  console.log('render');
  const [started, setStarted] = useState(false);
  const userName = useRef('');
  const userPass = useRef('');
  const clickedSignup = useRef(false);
  const [mistakes, setMistakes] = useState(0);
  let loggedIn = false;
  let passwordCheck = true;

  function handleUser(e) {
    userName.current = e.target.value;
  }
  function handleUserPass(e) {
    userPass.current = e.target.value;
  }

  function handleSignUp() {
    setStarted(true);
    clickedSignup.current = true;
  }

  async function handleFormSubmit() {
    try {
      loggedIn = await getLoginTrue(userName.current, userPass.current);
      passwordCheck = await getPasswordTrue(userName.current, userPass.current);

      console.log(loggedIn);
      if (loggedIn) {
        setStarted(true);
      } else if (!passwordCheck) {
        const count = mistakes + 1;
        console.log(count);
        setMistakes(count);
        console.log(count);
        alert('incorrect password');
      } else {
        // eslint this later
        // eslint-disable-next-line no-alert
        alert('wrong username or password');
      }
    } catch {
      // eslint-disable-next-line no-alert
      alert('wrong username or password');
    }
  }

  if (clickedSignup.current) {
    return (
      <div className="Signup">
        <Signup />
      </div>
    );
  }

  // needed for eslint. Figure it out later
  const domId = 124;
  if (!started && !clickedSignup.current) {
    if (mistakes >= 3) {
      return (
        <div>
          <Lockout />
        </div>
      );
    }
    return (
      <div className="Login-background">
        <h1 className="Login-title">Good Samaritans</h1>
        <div className="Login-rectangle">
          <label htmlFor={domId}>
            Username:
            {' '}
            <input name="user" onChange={handleUser} />
          </label>
          <label htmlFor={domId}>
            Password:
            {' '}
            <input name="password" onChange={handleUserPass} />
          </label>
          <button type="submit" onClick={handleFormSubmit}>Login</button>
        </div>
        <div className="Login-signup-box ">
          <h2 className="Login-signup-name">Do not have an Account?</h2>
          <button type="submit" onClick={handleSignUp}>Signup</button>
        </div>
      </div>
    );
  }

  return (
    <div className="Profile">
      <Profile accountName={userName.current} />
    </div>
  );
}

export default Login;
