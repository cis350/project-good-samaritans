/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import {
  React, useEffect, useRef, useState,
} from 'react';
import { deleteHelp, getSpecificHelp } from '../modules/api';
import '../assets/MyHelpPosts.css';
import Profile from './Profile';

function MyHelpPosts({ accountName, currentPrivacy, currentRequests }) {
  let posts = '';
  // eslint-disable-next-line no-unused-vars
  let arr = [];
  const targetName = useRef('');
  const [curr, setCurr] = useState(0);
  const MINUTE_MS = 5000;

  const [goBack, setGoBack] = useState(false);

  function handleTarget(e) {
    targetName.current = e.target.value;
  }

  function handleCurr() {
    setCurr(curr + 1);
  }

  async function handleGet() {
    posts = await getSpecificHelp(accountName);
    arr = posts.data;
    const holder = document.getElementById('holder3');
    holder.innerHTML = '';
    for (let i = 0; i < posts.data.length; i += 1) {
      const text = document.createElement('div', null, posts.data[i].post);
      text.textContent = posts.data[i].post;
      holder.appendChild(text);

      const text2 = document.createElement('div', null, null);
      text2.textContent = 'resolved by?';
      holder.appendChild(text2);

      const btn2 = document.createElement('input');
      btn2.textConent = 'Resolved By?';
      btn2.addEventListener('keyup', handleTarget);
      holder.appendChild(btn2);

      const btn = document.createElement('button');
      btn.innerHTML = 'Mark Resolved';
      // eslint-disable-next-line no-loop-func
      btn.addEventListener('click', async (e) => { await deleteHelp(accountName, arr[e.target.id].post, targetName.current); handleCurr(); });
      btn.setAttribute('id', i);
      holder.appendChild(btn);
    }
  }

  useEffect(() => {
    handleGet();
    const interval = setInterval(() => {
      handleGet();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {goBack ? (
        <div className="Profile">
          <Profile
            accountName={accountName}
            initialPrivacy={currentPrivacy}
            requests={currentRequests + 1}
          />
        </div>
      ) : (
        <div className="section">
          <div className="my-help-posts">
            <h1 className="helppost-title">Your Help Posts:</h1>
            <div id="holder3" />
            <div className="resolved-section">
              <button className="resolved-button" type="button" onClick={() => { setGoBack(true); }}>Go Back to Profile</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyHelpPosts;
