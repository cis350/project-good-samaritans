/* eslint-disable import/no-cycle */
import {
  React, useState, useEffect,
} from 'react';
import Login from './Login';

function Lockout() {
  const [seconds, setSeconds] = useState(10);

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
      ) : (<h1>ACCOUNT LOCKED OUT</h1>) }
    </div>
  );
}

export default Lockout;
