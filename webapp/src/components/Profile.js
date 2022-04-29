/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  React, useState, useEffect, useRef,
} from 'react';
import {
  changePrivacy, getHelpPosts,
} from '../modules/api';
import Training from './Training';
import Request from './Request';
import Account from './Account';
import Message from './Message';
import '../assets/Profile.css';
// import Friends from './Friends';

function Profile({ accountName }) {
  const name = useRef(accountName); // name of the user after logging in
  // const [friends, setFriends] = useState(false); // event if friends button was clicked
  const [training, setTraining] = useState(false); // event if the training button was clicked
  // const [tab, setTab] = useState('board'); // board or samaritan
  const [account, setAccount] = useState(false); // event if the account button was clicked
  const [privacy, setPrivacy] = useState('Private');
  const [request, setRequest] = useState(false);
  const [message, setMessage] = useState(false);
  const helpBoard = useRef();
  const currentPostName = useRef();
  const currentPostDescription = useRef();
  const [postCount, setPostCount] = useState(0);
  const clickedHelpBoardButton = useRef(false);
  const [, setRevealPosts] = useState(false);
  // const [clickedHelpBoardButton, setHelpButton] = useState(false);

  // const friendsList = Storage.getFriends(name.current); -
  // const friendsList = getFriends(name.current);
  useEffect(() => {
    async function privacyChange() {
      await changePrivacy(name.current, privacy);
    }
    privacyChange();
    async function initializeBoardPosts() {
      helpBoard.current = await getHelpPosts();
    }
    initializeBoardPosts();
  }, []);

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

  const handleHelpButton = () => {
    clickedHelpBoardButton.current = true;
    const x = helpBoard.current;
    currentPostName.current = x[postCount].name;
    currentPostDescription.current = x[postCount].post;
    setRevealPosts(true);
  };

  const handlePrevPost = () => {
    const currentCount = postCount;
    if (currentCount > 0) {
      const x = helpBoard.current;
      currentPostName.current = x[postCount - 1].name;
      currentPostDescription.current = x[postCount - 1].post;
      setPostCount(currentCount - 1);
    }
  };

  const handleNextPost = () => {
    const currentCount = postCount;
    if (currentCount < helpBoard.current.length) {
      const x = helpBoard.current;
      currentPostName.current = x[postCount + 1].name;
      currentPostDescription.current = x[postCount + 1].post;
      setPostCount(currentCount + 1);
    }
  };

  const handleMessage = () => {
    setMessage(true);
  };

  // const handleSamaritanTexts = async () => {
  //   setTab('samaritan');
  //   samaritanTexts.current = await getSamaritanTexts(name.current);
  // };

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
  if (account) { // Goes to account page
    return (
      <Account user={name.current} />
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
        <button className="profile-button" id="training" type="button" onClick={handleTraining}>
          Training
        </button>
        <div className="message">
          <button className="message-button" type="button" onClick={handleMessage}>
            Message
          </button>
        </div>
      </div>
      <div className="middleButtons">
        <button type="button" onClick={handleHelpButton}>Help Posts</button>
        {clickedHelpBoardButton.current ? (
          <div>
            {' '}
            { currentPostName.current }
            <br />
            { currentPostDescription.current }
            <br />
            <button type="button">Respond</button>
            <button type="button" onClick={handleNextPost}>Next</button>
            <button type="button" onClick={handlePrevPost}>Prev</button>
          </div>
        ) : (<div />)}
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
    </div>
  );
}

export default Profile;
