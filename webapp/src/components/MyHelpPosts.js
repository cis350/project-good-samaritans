import {
  React, useEffect,
} from 'react';
import { getSpecificHelp } from '../modules/api';

function MyHelpPosts({ accountName }) {
  let posts = '';
  // eslint-disable-next-line no-unused-vars
  let arr = [];
  const MINUTE_MS = 5000;

  async function handleGet() {
    posts = await getSpecificHelp(accountName);
    arr = posts.data;
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
      <h1>Your Help Posts:</h1>
      <div id="holder" />
    </div>
  );
}

export default MyHelpPosts;
