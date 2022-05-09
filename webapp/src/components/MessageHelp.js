/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import {
  React, useRef, useState, useEffect,
} from 'react';
import {
  getMessages, addMessage,
} from '../modules/api';
import '../assets/MessageHelp.css';
import Profile from './Profile';

function Message2({
  accountName, secondName, currentPrivacy, currentRequests,
}) {
  let targetName = secondName;
  const targetName2 = useRef('');
  let msgHistory = '';
  let arr = [];
  const d = new Date();
  const MINUTE_MS = 5000;

  const [sent, setSent] = useState(false);

  const sentTarget = useRef(false);
  const [goBack, setGoBack] = useState(false);

  function handleTarget2(e) {
    targetName2.current = e.target.value;
  }

  function showMessages() {
    const holder = document.getElementById('holder2');
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

  const interval1 = useRef(null);
  useEffect(() => {
    // console.log('in messagehelp useeffect');
    // gets all messages from person to message to
    async function handleDone() {
      targetName = secondName;
      arr = [];
      // console.log(accountName);
      // console.log(targetName);
      msgHistory = await getMessages(accountName, targetName);
      msgHistory.data.sort((a, b) => a.tme.localeCompare(b.tme));
      for (let i = 0; i < msgHistory.data.length; i += 1) {
        const temp = `${msgHistory.data[i].from}: ${msgHistory.data[i].msg}`;
        arr.push(temp);
      }
      showMessages();
    }
    handleDone();

    // adds messages
    async function handleDone2() {
      targetName = secondName;
      await addMessage(
        accountName,
        targetName,
        targetName2.current,
        d.getTime(),
      );
      const holder = document.getElementById('holder2');
      holder.innerHTML = '';
      handleDone();
    }

    if (sentTarget.current) {
      handleDone2();
      sentTarget.current = false;
    }

    interval1.current = setInterval(() => {
      // console.log('in messagehelp interval');
      handleDone();
      // console.log('should be after handleDone');
    }, MINUTE_MS);

    return () => {
      // console.log('should clear interval');
      clearInterval(interval1.current);
    };
  }, [sent]);

  if (goBack) {
    // console.log('in goback-profile');
    clearInterval(interval1.current);
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
  return (
    <div className="messagehelp-page">
      <div className="lefthelp-column">
        <h1 className="title">
          Good Samaritans
        </h1>
      </div>
      <div className="messagehelp-input">
        <div id="holder2" />
        <div className="messagehelp">
          <p className="prompthelp">
            Messaging :
            {targetName}
          </p>
          <p className="prompthelp">
            new message:
          </p>
          <input className="inputhelp" name="messageNow" onChange={handleTarget2} />
          <button className="submithelp" type="submit" onClick={handleSent}>Message</button>
        </div>
      </div>
      <div className="righthelp-column">
        <h1>
          Hello
          {' '}
          {accountName}
          !
        </h1>
        <button className="gobackhelp-button" type="submit" onClick={() => setGoBack(true)}>
          Go Back to Profile
        </button>
      </div>

    </div>
  );
}

export default Message2;
