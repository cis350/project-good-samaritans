/* eslint-disable import/no-cycle */
import {
  React, useRef, useState,
} from 'react';
import {
  getMessages, addMessage,
} from '../modules/api';
import '../assets/MessageHelp.css';
import Profile from './Profile';

function Message2({
  accountName, secondName, currentPrivacy, currentRequests,
}) {
  const targetName = secondName;
  const targetName2 = useRef('');
  let msgHistory = '';
  let arr = [];
  const d = new Date();

  const [goBack, setGoBack] = useState(false);

  function handleTarget2(e) {
    targetName2.current = e.target.value;
  }

  function showMessages() {
    const holder = document.getElementById('holder');
    for (let i = 0; i < arr.length; i += 1) {
      holder.innerHTML += `<p>${arr[i]}</p><br>`;
    }
  }

  async function handleDone() {
    arr = [];
    msgHistory = await getMessages(accountName, targetName);
    msgHistory.data.sort((a, b) => a.tme.localeCompare(b.tme));
    for (let i = 0; i < msgHistory.data.length; i += 1) {
      const temp = `${msgHistory.data[i].from}: ${msgHistory.data[i].msg}`;
      arr.push(temp);
    }
    showMessages();
  }

  async function handleDone2() {
    await addMessage(accountName, targetName, targetName2.current, d.getTime());
    const holder = document.getElementById('holder');
    holder.innerHTML = '';
    handleDone();
  }

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
  return (
    <div className="messagehelp-page">
      <div className="lefthelp-column">
        <h1 className="title">
          Good Samaritans
        </h1>
      </div>
      <div className="messagehelp-input">
        <div id="holder" />
        <div className="messagehelp">
          <p className="prompthelp">
            Messaging :
            {targetName}
          </p>
          <p className="prompthelp">
            new message:
          </p>
          <input className="inputhelp" name="messageNow" onChange={handleTarget2} />
          <button className="submithelp" type="submit" onClick={handleDone2}>Message</button>
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
