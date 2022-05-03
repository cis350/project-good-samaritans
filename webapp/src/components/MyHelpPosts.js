import {
  React, useEffect, useRef,
} from 'react';
import { deleteHelp, getSpecificHelp } from '../modules/api';

function MyHelpPosts({ accountName }) {
  let posts = '';
  // eslint-disable-next-line no-unused-vars
  let arr = [];
  const targetName = useRef('');

  function handleTarget(e) {
    targetName.current = e.target.value;
    console.log(targetName.current);
  }

  async function handleGet() {
    posts = await getSpecificHelp(accountName);
    arr = posts.data;
    const holder = document.getElementById('holder');
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
      btn.addEventListener('click', async (e) => { await deleteHelp(accountName, arr[e.target.id].post, targetName.current); });
      btn.setAttribute('id', i);
      holder.appendChild(btn);

      // holder.innerHTML += `<p></p>Resolved by?<input name="target"
      //  onChange={handleTarget} /><button id="${i}" type="button"
      // onClick={handleRespond}>Mark Resolved</button><br>`;
    }
  }

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div>
      <h1>Your Help Posts:</h1>
      <div id="holder" />
    </div>
  );
}

export default MyHelpPosts;
