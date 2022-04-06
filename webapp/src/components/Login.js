import { React, useState, useRef } from 'react';
import Profile from './Profile';
import Signup from './Signup';

function Login() {
  const [, setStarted] = useState(false);
  const start = useRef(false);
  const userName = useRef('');
  const userPass = useRef('');
  const clickedSignup = useRef(false);
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
  function handleFormSubmit() {
    if (/^[a-z0-9A-Z ]+$/.test(userName.current)) {
      setStarted(true);
      start.current = true;
    } else {
      // eslint this later
      // eslint-disable-next-line no-alert
      alert('must fill all values properly and alphanumerically');
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
  if (!start.current && !clickedSignup.current) {
    return (
      <div>
        <h1>Login</h1>
        <label htmlFor={domId}>
          Full Name:
          {' '}
          <input name="user" onChange={handleUser} />
        </label>
        <label htmlFor={domId}>
          Password:
          {' '}
          <input name="password" onChange={handleUserPass} />
        </label>
        <button type="submit" onClick={handleFormSubmit}>Login</button>
        <h2>Do not have an Account? Signup</h2>
        <button type="submit" onClick={handleSignUp}>Signup</button>
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
