/* eslint-disable no-console */
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
  let arr = [];
  const targetName = useRef('');
  const [curr, setCurr] = useState(0);
  const MINUTE_MS = 5000;

  const [goBack, setGoBack] = useState(false);

  const resolved = useRef(false);

  function handleTarget(e) {
    targetName.current = e.target.value;
  }

  function handleCurr() {
    resolved.current = true;
    setCurr(curr + 1);
  }

  async function resolvedFunction(e) {
    if (targetName.current !== '') {
      await deleteHelp(accountName, arr[e.target.id].post, targetName.current);
      handleCurr();
    }
  }

  async function handleGet() {
    if (targetName.current === '' || !resolved.current) {
      // console.log('in here');
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
        btn.addEventListener('click', resolvedFunction);
        btn.setAttribute('id', i);
        holder.appendChild(btn);
      }
    } else {
      // console.log('should not render resolve button');
      const holder = document.getElementById('holder3');
      holder.innerHTML = 'Resolved';
    }
  }

  const interval3 = useRef(null);
  useEffect(() => {
    handleGet();
    interval3.current = setInterval(() => {
      handleGet();
    }, MINUTE_MS);
    return () => clearInterval(interval3.current);
  }, []);

  if (goBack) {
    // console.log('in goback-profile');
    clearInterval(interval3.current);
    return (
      <div className="Profile">
        <Profile
          accountName={accountName}
          initialPrivacy={currentPrivacy}
          requests={currentRequests + 1}
        />
      </div>
    );
  }
  return (
    <div>
      <div className="section">
        <div className="my-help-posts">
          <h1 className="helppost-title">Your Help Posts:</h1>
          <div id="holder3" />
          <div className="resolved-section">
            <button className="resolved-button" type="button" onClick={() => { setGoBack(true); }}>Go Back to Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyHelpPosts;
