/* eslint-disable import/no-cycle */
import { React, useState, useRef } from 'react';
import { addUser, getProfile } from '../modules/api';
import Login from './Login';

function Signup() {
  const userInput = useRef('');
  const userPwd = useRef('');
  const userInputStreet = useRef('');
  const userInputState = useRef('');
  const userInputCountry = useRef('');
  const userInputZIP = useRef('');
  const userInputCOVID = useRef('');
  const [login, setLogin] = useState(false);
  const d = new Date();
  let exists = null;

  const [started, setStarted] = useState(false);

  function handleUser(e) {
    userInput.current = e.target.value;
  }

  function handleUserPwd(e) {
    userPwd.current = e.target.value;
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
  async function handleFormSubmit() {
    try {
      exists = await getProfile(userInput.current);

      if (exists != null) {
        // eslint-disable-next-line no-alert
        alert('username already exists');
        return;
      }
      if (/^[a-z0-9A-Z ]+$/.test(userInput.current)) {
        console.log(userInput);
        console.log(userInputStreet);
        console.log(userInputState);
        console.log(userInputCountry);
        console.log(userInputZIP);
        console.log(userInputCOVID);

        const date = {
          year: d.getFullYear(),
          month: d.getMonth(),
          day: d.getDay(),
        };
        addUser(
          userInput.current,
          userInputStreet.current,
          userInputState.current,
          userInputCountry.current,
          userInputZIP.current,
          userPwd.current,
          'Private',
          date,
          0,
          0,
        );
        setStarted(true);
      } else {
        //  eslint this later
        // eslint-disable-next-line no-alert
        alert('must fill all values properly and alphanumerically');
      }
    } catch {
      // eslint-disable-next-line no-alert
      alert('error submitting');
    }
  }

  // placeholder variable for eslint
  const domId = 123;
  if (!started) {
    return (
      <div>
        <h1>Enter Account Information</h1>
        <label htmlFor={domId}>
          Full Name:
          {' '}
          <input name="user" onChange={handleUser} />
        </label>
        <label htmlFor={domId}>
          Password:
          {' '}
          <input name="password" onChange={handleUserPwd} />
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
      </div>
    );
  }

  if (started) {
    if (!login) {
      return (
        <div>
          <h1>REGISTRATION SUCCESSFUL</h1>
          <button type="button" onClick={() => { setLogin(true); }}>Login</button>
        </div>
      );
    }
    return (
      <div className="Profile">
        <Login />
      </div>
    );
  }
}

export default Signup;
