import {
  React, useState, useEffect, useRef,
} from 'react';
// import { View, Text, Button } from 'react-native';
import {
  getMessages, addMessage,
} from '../modules/api';

// const {
//   accountName, currentPrivacy, currentRequests,
// } = route.params;

function Message({ route, navigation }) {
  const {
    accountName,
  } = route.params;

  const [goBack, setgoBack] = useState(false);
  const [target, setTarget] = useState(false);
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
      holder.innerHTML += `<p>${arr[i]}</p><br>`;
    }
  }

  // gets all messages from person to message to
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

  // adds messages
  async function handleDone2() {
    await addMessage(accountName, targetName.current, targetName2.current, (new Date()).getTime());
    const holder = document.getElementById('holder');
    holder.innerHTML = '';
    handleDone();
  }

  // go back to profile
  const handleGoBack = () => {
    setgoBack(true);
  };

  if (goBack) {
    // navigation.navigate('Profile', {
    //   accountName,
    //   initialPrivacy: currentPrivacy,
    //   requests: currentRequests,
    // });
    navigation.goBack();
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
        <button type="submit" onClick={handleGoBack}>
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
      <input name="messageNow" onChange={handleTarget2} />
      <button type="submit" onClick={handleDone2}>Message</button>
      <button type="submit" onClick={handleGoBack}>
        <div>
          Go Back to Profile
        </div>
      </button>
    </div>
  );
}

export default Message;
