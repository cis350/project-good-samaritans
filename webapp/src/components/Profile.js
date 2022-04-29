/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  React, useState, useEffect, useRef,
} from 'react';
import {
  changePrivacy, getHelpPosts, getSamaritanTexts,
} from '../modules/api';
import Training from './Training';
import Request from './Request';
import Account from './Account';
import Message from './Message';
import '../assets/Profile.css';
// import Friends from './Friends';

function Profile({ accountName }) {
  console.log('in profile', accountName);
  const name = useRef(accountName); // name of the user after logging in
  // const [friends, setFriends] = useState(false); // event if friends button was clicked
  const [training, setTraining] = useState(false); // event if the training button was clicked
  const [tab, setTab] = useState('board'); // board or samaritan
  const [account, setAccount] = useState(false); // event if the account button was clicked
  const [privacy, setPrivacy] = useState('Private');
  const [request, setRequest] = useState(false);
  const [message, setMessage] = useState(false);
  // const [friendSearch, setFriendSearch] = useState();
  const helpBoard = useRef([]);
  const samaritanTexts = useRef();

  // const friendsList = Storage.getFriends(name.current); -
  // const friendsList = getFriends(name.current);

  // DOESN'T WORK YETs
  useEffect(() => {
    changePrivacy(name.current, privacy);
  }, [privacy]);

  const handlePrivacy = () => {
    if (privacy === 'Private') {
      setPrivacy('Public');
    } else {
      setPrivacy('Private');
    }
  };

  const handleTraining = () => {
    setTraining(true);
  };

  const handleRequest = () => {
    setRequest(true);
  };

  const handleAccount = () => {
    setAccount(true);
  };

  // const handleFriends = () => {
  //   if (friends) {
  //     setFriends(false);
  //   } else {
  //     setFriends(true);
  //   }
  // };

  // For some reason doesn't render when first opened
  useEffect(() => {
    async function fetchHelpPosts() {
      helpBoard.current = await getHelpPosts();
    }
    console.log('posts:', helpBoard.current);
    fetchHelpPosts();
  });

  const handleHelpPosts = () => {
    setTab('board');
  };

  const handleMessage = () => {
    setMessage(true);
  };

  const handleSamaritanTexts = () => {
    setTab('samaritan');
    samaritanTexts.current = getSamaritanTexts(name.current);
  };

  if (training) { // Goes to training page
    return (
      <Training />
    );
  }
  if (request) { // Goes to request page
    return (
      <Request name={name.current} />
    );
  }
  if (account) {
    return (
      <Account />
    );
  }
  if (message) {
    return (
      <Message accountName={accountName} />
    );
  }

  return (
    <div className="Profile">
      <div className="title">
        <h1>Good Samaritans</h1>
      </div>
      <div className="leftButtons">
        {/* <button className="profile-button" id="friends" type="button" onClick={handleFriends}>
          Friends
        </button> */}
        <button className="profile-button" id="training" type="button" onClick={handleTraining}>
          Training
        </button>
      </div>
      <div className="middleButtons">
        <div className="tabs">
          <button id="help" type="button" onClick={handleHelpPosts}>
            Help Board
          </button>
          <button id="samaritan" type="button" onClick={handleSamaritanTexts}>
            Samaritan Help
          </button>
          {(tab === 'board') ? (
            <div className="help-board">
              <ol className="helpList">
                {helpBoard.current.map((post) => (
                  <li key={post.name}>
                    {post.name}
                    {': '}
                    {post.post}
                  </li>
                ))}
              </ol>
            </div>
          ) : (<div className="samaritan-help">WHO YOU ARE CURRENTLY HELPING GOES HERE</div>)}
        </div>
      </div>
      <div className="rightButtons">
        <div className="profileName">
          <h3>{ name.current }</h3>
        </div>
        <button className="profile-button" id="account" type="button" onClick={handleAccount}>
          Account
        </button>
        <button className="profile-button" id="privacy" type="button" onClick={handlePrivacy}>
          { privacy }
        </button>
      </div>
      <div className="request">
        <button className="request-button" type="button" onClick={handleRequest}>
          Request
        </button>
      </div>
      <div className="message">
        <button className="message-button" type="button" onClick={handleMessage}>
          Message
        </button>
      </div>
    </div>
  );
}

export default Profile;
