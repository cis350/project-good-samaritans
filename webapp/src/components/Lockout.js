/* eslint-disable import/no-cycle */
import {
  React, useState, useEffect,
} from 'react';
import Login from './Login';
import '../assets/Lockout.css';

function Lockout() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div>
      { seconds === 0 ? (
        <div className="Login">
          <Login />
        </div>
      ) : (
        <div className="lockout-page">
          <div className="lockout-title-container">
            <h1 className="Lockout-title">Good Samaritans</h1>
          </div>
          <p id="description">Your account has been temporarily locked due to multiple invalid logins. Please try again later.</p>
        </div>
      ) }
    </div>
  );
}

export default Lockout;
