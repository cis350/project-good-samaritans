/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-cycle */
import { React, useState, useRef } from 'react';
import { addUser, getProfile } from '../modules/api';
import Login from './Login';
import '../assets/Signup.css';

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

  async function handleFormSubmit() {
    try {
      exists = await getProfile(userInput.current);

      if (exists != null) {
        // eslint-disable-next-line no-alert
        alert('username already exists');
        return;
      }
      if (/^[a-z0-9A-Z ]+$/.test(userInput.current)) {
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
      <div className="signup-page">
        <div className="signup-title-container">
          <h1 className="signup-title">Good Samaritans</h1>
        </div>
        <div className="input-container">
          <label className="input-title" htmlFor={domId}>
            Full Name:
            {' '}
          </label>
          <input className="input-box" name="user" onChange={handleUser} />
          <label className="input-title" htmlFor={domId}>
            Password:
            {' '}
          </label>
          <input className="input-box" name="password" onChange={handleUserPwd} />
          <label className="input-title" htmlFor={domId}>
            Street:
            {' '}
          </label>
          <input className="input-box" name="street" onChange={handleUserStreet} />
          <div className="state-country">
            <div className="state">
              <label id="state-title" htmlFor={domId}>
                State:
                {' '}
              </label>
              <input id="state-input" name="state" onChange={handleUserState} />
            </div>
            <div className="country">
              <label id="country-title" htmlFor={domId}>
                Country:
                {' '}
              </label>
              <input id="country-input" name="country" onChange={handleUserCountry} />
            </div>
          </div>
          <label className="input-title" htmlFor={domId}>
            Zipcode:
            {' '}
          </label>
          <input id="zip" name="zip" onChange={handleUserZIP} />
          <label className="input-title" htmlFor={domId}>
            Please describe your COVID19 vaccination Status:
            {' '}
          </label>
          <input className="input-box" name="user" onChange={handleUserCOVID} />
        </div>
        <button className="submit-button" type="submit" onClick={handleFormSubmit}>Sign Up</button>
      </div>
    );
  }

  if (started) {
    if (!login) {
      return (
        <div className="signup-page">
          <div className="signup-title-container">
            <h1 className="signup-title">Good Samaritans</h1>
          </div>
          <p id="success">Registration successful</p>
          <button className="login-button" type="button" onClick={() => { setLogin(true); }}>Login</button>
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
