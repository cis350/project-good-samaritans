import {
  React, useState, useEffect, useRef,
} from 'react';
import {
  addMessage,
} from '../modules/api';
// eslint-disable-next-line import/no-cycle
import Profile from './Profile';
//   import Training from './Training';
//   import Request from './Request';
//   import Account from './Account';
//   import '../assets/Profile.css';
// import Friends from './Friends';

function Message({ accountName, currentPrivacy, currentRequests }) {
  const [goBack, setgoBack] = useState(false);
  const targetName = useRef('');
  const targetName2 = useRef('');
  const MINUTE_MS = 5000;

  useEffect(() => {
    const interval = setInterval(() => {
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  // adds messages
  async function handleDone2() {
    await addMessage(accountName, targetName.current, targetName2.current, (new Date()).getTime());
    const holder = document.getElementById('holder');
    holder.innerHTML = '';
  }

  // go back to profile
  const handleGoBack = () => {
    setgoBack(true);
  };

  if (goBack) {
    return (
      <div className="Profile">
        <Profile
          accountName={accountName}
          initialPrivacy={currentPrivacy}
          requests={currentRequests}
        />
      </div>
    );
  }
  if (false) {
    return (
      <div>
        <h1>
          Hello
          {' '}
          {accountName}
          !
        </h1>
        <h2> Who would you like to message?</h2>
        <button id="2" type="submit" onClick={handleGoBack}>
          <div>
            Go Back to Profile
          </div>
        </button>
      </div>
    );
  }
  return (
    <div>
      <div id="holder" />
      <div>new message:</div>
      <button type="submit" id="5" onClick={handleDone2}>Message</button>
      <button id="2" type="submit" onClick={handleGoBack}>
        <div>
          Go Back to Profile
        </div>
      </button>
    </div>
  );
}

export default Message;
