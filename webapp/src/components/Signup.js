import { React, useState, useRef } from 'react';
import Profile from './Profile';
import Login from './Login';

function Signup() {
  const userInput = useRef('');
  const userInputStreet = useRef('');
  const userInputState = useRef('');
  const userInputCountry = useRef('');
  const userInputZIP = useRef('');
  const userInputCOVID = useRef('');

  const [, setStarted] = useState(false);
  const start = useRef(false);
  const cloggedin = useRef(false);

  function handleUser(e) {
    userInput.current = e.target.value;
  }

  function handleUserStreet(e) {
    userInputStreet.current = e.target.value;
  }

  function handleUserState(e) {
    userInputState.current = e.target.value;
  }

  function handleUserCountry(e) {
    userInputCountry.current = e.target.value;
  }

  function handleUserZIP(e) {
    userInputZIP.current = e.target.value;
  }

  function handleUserCOVID(e) {
    userInputCOVID.current = e.target.value;
  }

  // remove console.log for eslint later
  function handleFormSubmit() {
    if (/^[a-z0-9A-Z ]+$/.test(userInput.current)) {
      console.log(userInput);
      console.log(userInputStreet);
      console.log(userInputState);
      console.log(userInputCountry);
      console.log(userInputZIP);
      console.log(userInputCOVID);

      setStarted(true);
      start.current = true;
    } else {
      //  eslint this later
      // eslint-disable-next-line no-alert
      alert('must fill all values properly and alphanumerically');
    }
  }

  function handleLogin() {
    setStarted(true);
    cloggedin.current = true;
  }
  if (cloggedin.current) {
    return (
      <div className="Login">
        <Login />
      </div>
    );
  }

  // placeholder variable for eslint
  const domId = 123;
  if (!start.current && !cloggedin.current) {
    return (
      <div>
        <h1>Enter Account Information</h1>
        <label htmlFor={domId}>
          Full Name:
          {' '}
          <input name="user" onChange={handleUser} />
        </label>
        <label htmlFor={domId}>
          Street:
          {' '}
          <input name="street" onChange={handleUserStreet} />
        </label>
        <label htmlFor={domId}>
          State:
          {' '}
          <input name="state" onChange={handleUserState} />
        </label>
        <label htmlFor={domId}>
          Country:
          {' '}
          <input name="country" onChange={handleUserCountry} />
        </label>
        <label htmlFor={domId}>
          Zipcode:
          {' '}
          <input name="zip" onChange={handleUserZIP} />
        </label>
        <label htmlFor={domId}>
          COVID vaccination record:
          {' '}
          <input name="user" onChange={handleUserCOVID} />
        </label>
        <button type="submit" onClick={handleFormSubmit}>Sign Up</button>
        <h2>Already have an account? Login!</h2>
        <button type="submit" onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="Profile">
      <Profile accountName={userInput.current} />
    </div>
  );
}

export default Signup;
