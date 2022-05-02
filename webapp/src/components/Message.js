import {
  React, useState, useEffect, useRef,
} from 'react';
import {
  getMessages, addMessage,
} from '../modules/api';
//   import Training from './Training';
//   import Request from './Request';
//   import Account from './Account';
//   import '../assets/Profile.css';
// import Friends from './Friends';

function Message({ accountName }) {
  const [target, setTarget] = useState(false);
  const targetName = useRef('');
  const targetName2 = useRef('');
  let msgHistory = '';
  let arr = [];
  const d = new Date();
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
      holder.innerHTML += `<p>${arr[i]}</p><br>`;
    }
  }

  async function handleDone() {
    arr = [];
    msgHistory = await getMessages(accountName, targetName.current);
    msgHistory.data.sort((a, b) => a.tme.localeCompare(b.tme));
    for (let i = 0; i < msgHistory.data.length; i += 1) {
      const temp = `${msgHistory.data[i].from}: ${msgHistory.data[i].msg}`;
      arr.push(temp);
    }

    setTarget(true);
    showMessages();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleDone();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  async function handleDone2() {
    await addMessage(accountName, targetName.current, targetName2.current, d.getTime());
    const holder = document.getElementById('holder');
    holder.innerHTML = '';
    handleDone();
  }

  if (!target) {
    return (
      <div>
        <h1>
          Hello
          {' '}
          {accountName}
          !
        </h1>
        <h2> Who would you like to message?</h2>
        <input name="target" onChange={handleTarget} />
        <button type="submit" onClick={handleDone}>Message</button>
      </div>
    );
  }
  return (
    <div>
      <div id="holder" />
      <div>new message:</div>
      <input name="messageNow" onChange={handleTarget2} />
      <button type="submit" onClick={handleDone2}>Message</button>
    </div>
  );
}

export default Message;
