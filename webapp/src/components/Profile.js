/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-cycle */
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
import Message2 from './MessageHelp';
import MyHelpPosts from './MyHelpPosts';
import '../assets/Profile.css';
// import Friends from './Friends';

function Profile({
  accountName, initialPrivacy, requests, helped,
}) {
  console.log('rerender');
  const name = useRef(accountName); // name of the user after logging in
  // const [friends, setFriends] = useState(false); // event if friends button was clicked
  const [training, setTraining] = useState(false); // event if the training button was clicked
  // const [tab, setTab] = useState('board'); // board or samaritan
  const [account, setAccount] = useState(false); // event if the account button was clicked
  const [privacy, setPrivacy] = useState(initialPrivacy);
  const [request, setRequest] = useState(false);
  const [message, setMessage] = useState(false);
  const [myHelp, setMyHelp] = useState(false);
  const [respond, setRespond] = useState(false);
  const helpBoard = useRef();
  const currentPostName = useRef();
  const currentPostDescription = useRef();
  const [postCount, setPostCount] = useState(0);
  const clickedHelpBoardButton = useRef(false);
  const [, setRevealPosts] = useState(false);
  const requestsNo = useRef(requests);
  const helpedNo = useRef(helped);
  console.log(`number of requests: ${requestsNo.current}`);
  // console.log(initialPrivacy);
  // console.log(`initial: ${privacy}`);
  // const MINUTE_MS = 5000;
  // let currLength;
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

    console.log('in useeffect');
    console.log(helpBoard.current);
    console.log(privacy);
  }, [privacy, postCount]);
  // console.log('outside useeffect');
  // console.log(helpBoard.current);

  const handlePrivacy = () => {
    if (privacy === 'Private') {
      console.log('chaging privacy');
      setPrivacy('Public');
    } else {
      console.log('else privacy');
      setPrivacy('Private');
    }
  };

  const handleTraining = () => {
    setTraining(true);
  };

  const handleMyHelp = () => {
    setMyHelp(true);
  };

  const handleRequest = () => {
    setRequest(true);
  };

  const handleAccount = () => {
    setAccount(true);
  };

  const handleHelpButton = () => {
    // currLength = helpBoard.current.length;
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

  const handleRespond = () => {
    setRespond(true);
  };

  // const handleSamaritanTexts = async () => {
  //   setTab('samaritan');
  //   samaritanTexts.current = await getSamaritanTexts(name.current);
  // };

  if (training) { // Goes to training page
    return (
      <Training
        accountName={accountName}
        currentPrivacy={privacy}
        currentRequests={requestsNo.current}
      />
    );
  }
  if (request) { // Goes to request page
    return (
      <Request
        accountName={accountName}
        currentPrivacy={privacy}
        currentRequests={requestsNo.current}
      />
    );
  }
  if (account) { // Goes to account page
    return (
      <Account
        accountName={accountName}
        currentPrivacy={privacy}
        currentRequests={requestsNo.current}
      />
    );
  }
  if (message) {
    return (
      <Message
        accountName={accountName}
        currentPrivacy={privacy}
        currentRequests={requestsNo.current}
      />
    );
  }

  if (myHelp) {
    return (
      <MyHelpPosts accountName={accountName} />
    );
  }

  if (respond) {
    return (
      <Message2 accountName={accountName} secondName={currentPostName.current} />
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
        <div className="myHelp">
          <button className="message-button" type="button" onClick={handleMyHelp}>
            My Help Posts
          </button>
        </div>
        <div className="analytics">
          <h3>User Analytics</h3>
          <p>Number of Requests Made: </p>
          {' '}
          { requestsNo.current }
          <p>Number Helped: </p>
          { helpedNo.current }
          { }
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
            <button type="button" onClick={handleRespond}>Respond</button>
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
