import {
  React, useState, useEffect, useRef,
} from 'react';
import Storage from '../modules/Storage';
import Training from './Training';
import Request from './Request';
import '../assets/Profile.css';

function Profile({ accountName }) {
  console.log('in profile');
  const name = useRef(accountName); // name of the user after logging in
  const [, setFriends] = useState(false); // event if friends button was clicked
  const [training, setTraining] = useState(false); // event if the training button was clicked
  const [tab, setTab] = useState('board'); // board or samaritan
  const [, setAccount] = useState(false); // event if the account button was clicked
  const [privacy, setPrivacy] = useState('Private');
  const [request, setRequest] = useState(false);

  useEffect(() => {
    Storage.changePrivacy(name.current, privacy);
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

  if (training) { // Goes to training page
    return (
      <Training />
    );
  }
  if (request) { // Goes to request page
    return (
      <Request />
    );
  }

  return (
    <div className="Profile">
      <div className="title">
        <h1>Good Samaritans</h1>
      </div>
      <div className="leftButtons">
        <button className="profile-button" id="friends" type="button" onClick={() => { setFriends(true); }}>
          Friends
        </button>
        <button className="profile-button" id="training" type="button" onClick={handleTraining}>
          Training
        </button>
      </div>
      <div className="middleButtons">
        <div className="tabs">
          <button id="help" type="button" onClick={() => { setTab('board'); }}>
            Help Board
          </button>
          <button id="samaritan" type="button" onClick={() => { setTab('samaritan'); }}>
            Samaritan Help
          </button>
        </div>
        {(tab === 'board') ? (<div className="help-board">HELP POSTS GO HERE</div>) : (<div className="samaritan-help">WHO YOU ARE CURRENTLY HELPING GOES HERE</div>)}
      </div>
      <div className="rightButtons">
        <div className="profileName">
          <h3>{ name.current }</h3>
        </div>
        <button className="profile-button" id="account" type="button" onClick={() => { setAccount(true); }}>
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
