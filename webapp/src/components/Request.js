/* eslint-disable import/no-cycle */
import { React, useRef, useState } from 'react';
import { postRequest } from '../modules/api';
import Profile from './Profile';

function Request({ name }) {
  const [requ, setRequ] = useState(false);
  const [goBack, setGoBack] = useState(false);
  const reqPost = useRef('');

  function handleReqText(e) {
    reqPost.current = e.target.value;
  }

  // Gonna change this after adding routes
  function sendRequest() {
    // console.log('sent request');
    postRequest(name, reqPost.current);
    setRequ(true);
  }
  const domId = 125;
  if (requ) {
    if (!goBack) {
      return (
        <div>
          <h1>Request sent</h1>
          <button type="button" onClick={() => { setGoBack(true); }}>Go Back to Profile</button>
        </div>
      );
    }
    return (
      <div className="Profile">
        <Profile accountName={name} />
      </div>
    );
  }
  return (
    <div>
      <h1>
        What is your issue
        {' '}
        {name}
      </h1>
      <label htmlFor={domId}>
        <input name="text" onChange={handleReqText} />
      </label>
      <button type="submit" onClick={sendRequest}>
        <div>
          Report non-immediate emergency
        </div>
      </button>
    </div>
  );
}

export default Request;
