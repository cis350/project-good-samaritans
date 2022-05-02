import {
  React, useEffect, useRef,
} from 'react';
import { getSpecificHelp } from '../modules/api';

function MyHelpPosts({ accountName }) {
  let posts = '';
  // eslint-disable-next-line no-unused-vars
  let arr = [];
  const targetName = useRef('');

  // eslint-disable-next-line no-unused-vars
  function handleTarget(e) {
    targetName.current = e.target.value;
    console.log(targetName.current);
  }

  // eslint-disable-next-line no-unused-vars
  async function handleRespond(id) {
    console.log(id);
    // await deleteHelp(accountName, );
  }

  async function handleGet() {
    posts = await getSpecificHelp(accountName);
    arr = posts.data;
    const holder = document.getElementById('holder');
    for (let i = 0; i < posts.data.length; i += 1) {
      holder.innerHTML += `<p>${posts.data[i].post}</p>Resolved by?<input name="target" onChange={handleTarget} /><button id="${i}" type="button" onClick={handleRespond}>Mark Resolved</button><br>`;
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
