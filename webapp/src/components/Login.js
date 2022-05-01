/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
import {
  React, useState, useRef,
} from 'react';
import '../assets/Login.css';
import {
  getLoginTrue, getPasswordTrue, changePassword, getProfile,
} from '../modules/api';
import Profile from './Profile';
import Signup from './Signup';
import Lockout from './Lockout';
// import Forgot from './Forgot';

function Login() {
  console.log('render');
  const [started, setStarted] = useState(false);
  const userName = useRef('');
  const userPass = useRef('');
  const userNewPass = useRef('');
  const clickedSignup = useRef(false);
  const [mistakes, setMistakes] = useState(0);
  const [forgot, setForgot] = useState(false);
  let loggedIn = false;
  let passwordCheck = true;
  const [privacy, setPrivacy] = useState('');

  function handleUser(e) {
    userName.current = e.target.value;
  }
  function handleUserPass(e) {
    userPass.current = e.target.value;
  }
  function handleNewUserPass(e) {
    userNewPass.current = e.target.value;
  }
  function handleSignUp() {
    setStarted(true);
    clickedSignup.current = true;
  }

  function handleChangePassword() {
    changePassword(userName.current, userNewPass.current);
    setForgot(false);
  }

  async function handleFormSubmit() {
    try {
      loggedIn = await getLoginTrue(userName.current, userPass.current);
      passwordCheck = await getPasswordTrue(userName.current, userPass.current);

      console.log(`handleFormSubmit loggedin: ${loggedIn}`);
      if (loggedIn) {
        const result = await getProfile(userName.current);
        setPrivacy(result.privacy);
        setStarted(true);
      } else if (!passwordCheck) {
        const count = mistakes + 1;
        setMistakes(count);
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

    if (forgot) {
      return (
        <div className="Login-rectangle">
          <label htmlFor={domId}>
            Username:
            {' '}
            <input name="user" onChange={handleUser} />
          </label>
          <label htmlFor={domId}>
            New Password:
            {' '}
            <input name="password" onChange={handleNewUserPass} />
          </label>
          <button type="button" onClick={handleChangePassword}>Reset Password</button>
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
          <button type="button" onClick={() => setForgot(true)}>Forgot Password?</button>
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
      <Profile accountName={userName.current} initialPrivacy={privacy} />
    </div>
  );
}

export default Login;
