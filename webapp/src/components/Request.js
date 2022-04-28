import { React, useRef } from 'react';
import { postRequest } from '../modules/api';

function Request({ name }) {
  const reqPost = useRef('');

  function handleReqText(e) {
    reqPost.current = e.target.value;
  }

  // Gonna change this after adding routes
  function sendRequest() {
    console.log('sent request');
    postRequest(name, reqPost.current);
    // window.location.reload(false);
  }
  const domId = 125;
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
