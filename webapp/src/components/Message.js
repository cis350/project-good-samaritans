/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import {
  React, useState, useEffect, useRef,
} from 'react';
import {
  getMessages, addMessage,
} from '../modules/api';
// eslint-disable-next-line import/no-cycle
import Profile from './Profile';
import '../assets/Message.css';

function Message({ accountName, currentPrivacy, currentRequests }) {
  const [goBack, setgoBack] = useState(false);
  const [target, setTarget] = useState(false);
  const [, setDone] = useState(false);
  const sentTarget = useRef(false);
  const [sent, setSent] = useState(false);
  const targetName = useRef('');
  const targetName2 = useRef('');
  let msgHistory = '';
  let arr = [];
  const MINUTE_MS = 5000;

  function handleTarget(e) {
    targetName.current = e.target.value;
  }

  function handleTarget2(e) {
    targetName2.current = e.target.value;
  }

  function showMessages() {
    const holder = document.getElementById('holder');
    holder.innerHTML = '';
    for (let i = 0; i < arr.length; i += 1) {
      holder.innerHTML += `<p>${arr[i]}</p>`;
    }
  }

  function handleSent() {
    sentTarget.current = true;
    if (sentTarget.current) {
      if (sent) {
        setSent(false);
      } else {
        setSent(true);
      }
    }
  }

  useEffect(() => {
    console.log('in message useeffect');
    // gets all messages from person to message to
    async function handleDone() {
      arr = [];
      console.log(accountName);
      console.log(targetName.current);
      msgHistory = await getMessages(accountName, targetName.current);
      msgHistory.data.sort((a, b) => a.tme.localeCompare(b.tme));
      for (let i = 0; i < msgHistory.data.length; i += 1) {
        const temp = `${msgHistory.data[i].from}: ${msgHistory.data[i].msg}`;
        arr.push(temp);
      }

      setTarget(true);
      showMessages();
    }

    // adds messages
    async function handleDone2() {
      await addMessage(
        accountName,
        targetName.current,
        targetName2.current,
        (new Date()).getTime(),
      );
      const holder = document.getElementById('holder');
      holder.innerHTML = '';
      handleDone();
    }

    if (sentTarget.current) {
      handleDone2();
      sentTarget.current = false;
    }
    const interval = setInterval(() => {
      console.log('in message interval');
      handleDone();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [sent]);

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
  if (!target) {
    return (
      <div className="message-page">
        <div className="left-column">
          <h1 className="title">
            Good Samaritans
          </h1>
        </div>
        <div className="message-input">
          <div className="message">
            <p className="prompt">Who would you like to message?</p>
            <input className="input" name="target" onChange={handleTarget} />
            <button className="submit" type="submit" onClick={() => setDone(true)}>Message</button>
          </div>
        </div>
        <div className="right-column">
          <h1>
            Hello
            {' '}
            {accountName}
            !
          </h1>
          <button className="goback-button" type="submit" onClick={handleGoBack}>
            Go Back to Profile
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="message-page">
      <div className="left-column">
        <h1 className="title">
          Good Samaritans
        </h1>
      </div>
      <div className="message-input">
        <div id="holder" />
        <div className="message">
          <p className="prompt">new message:</p>
          <input className="input" name="messageNow" onChange={handleTarget2} />
          <button className="submit" type="submit" onClick={handleSent}>Message</button>
        </div>
      </div>
      <div className="right-column">
        <h1>
          Hello
          {' '}
          {accountName}
          !
        </h1>
        <button className="goback-button" type="submit" onClick={handleGoBack}>
          Go Back to Profile
        </button>
      </div>
    </div>
  );
}

export default Message;
