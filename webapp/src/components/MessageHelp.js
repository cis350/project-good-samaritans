import {
  React, useRef,
} from 'react';
import {
  addMessage,
} from '../modules/api';
//   import Training from './Training';
//   import Request from './Request';
//   import Account from './Account';
//   import '../assets/Profile.css';
// import Friends from './Friends';

function Message2({ accountName, secondName }) {
  const targetName = secondName;
  const targetName2 = useRef('');
  const d = new Date();

  function handleTarget2(e) {
    targetName2.current = e.target.value;
  }

  async function handleDone2() {
    await addMessage(accountName, targetName, targetName2.current, d.getTime());
    const holder = document.getElementById('holder');
    holder.innerHTML = '';
  }

  return (
    <div>
      <div>
        Messaging :
        {targetName}
      </div>
      <div id="holder" />
      <div>new message:</div>
      <input name="messageNow" id="2" onChange={handleTarget2} />
      <button type="submit" id="3" onClick={handleDone2}>Message</button>
    </div>
  );
}

export default Message2;
