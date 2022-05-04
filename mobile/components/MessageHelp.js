import {
  React, useRef,
} from 'react';
import {
  getMessages, addMessage,
} from '../modules/api';
//   import Training from './Training';
//   import Request from './Request';
//   import Account from './Account';
//   import '../assets/Profile.css';
// import Friends from './Friends';

function Message2({ route }) {
  const {
    accountName, secondName,
  } = route.params;

  const targetName = secondName;
  const targetName2 = useRef('');
  let msgHistory = '';
  let arr = [];
  const d = new Date();

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

  return (
    <div>
      <div>
        Messaging :
        {targetName}
      </div>
      <div id="holder" />
      <div>new message:</div>
      <input name="messageNow" onChange={handleTarget2} />
      <button type="submit" onClick={handleDone2}>Message</button>
    </div>
  );
}

export default Message2;
