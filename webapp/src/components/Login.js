import { React, useState, useRef } from 'react';
import Profile from './Profile';

function Login() {
  const [, setStarted] = useState(false);
  const start = useRef(false);
  const userName = useRef('');
  const userPass = useRef('');
  function handleUser(e) {
    userName.current = e.target.value;
  }
  function handleUserPass(e) {
    userPass.current = e.target.value;
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
  // needed for eslint. Figure it out later
  const domId = 124;
  if (!start.current) {
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
