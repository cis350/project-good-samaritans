/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
  import {
    React, useState, useEffect, useRef,
  } from 'react';
  import Storage from '../modules/Storage';
  import Request from './Request';
  import '../assets/Profile.css';
  
  function Profile() {
    console.log('in profile');
    const name = useRef('hi'); // name of the user after logging in
    const [, setFriends] = useState(false); // event if friends button was clicked
    const [, setTraining] = useState(false); // event if the training button was clicked
    const [, setAccount] = useState(false); // event if the account button was clicked
    const [privacy, setPrivacy] = useState('Private');
    const [tab, setTab] = useState('board'); // board or samaritan
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

    const handleRequest = () => {
      setRequest(true);
    };  

    // Goes to request page
    if(request){
      return (
        <Request />
      );
    }    
  
    return (
      <div className="Profile">
        <div className="title">
          <h1>Good Samaritans</h1>
        </div>
        <div>
          <button className="profile-button" type="button" onClick={() => { setFriends(true); }}>
            Friends
          </button>
          <button className="profile-button" type="button" onClick={() => { setTraining(true); }}>
            Training
          </button>
        </div>
        <div>
          <button type="button" onClick={() => { setTab('board'); }}>
            Help Board
          </button>
          <button type="button" onClick={() => { setTab('samaritan'); }}>
            Samaritan Help
          </button>
          {(tab === 'board') ? (<div className="help-board">HELP POSTS GO HERE</div>) : (<div className="samaritan-help">WHO YOU ARE CURRENTLY HELPING GOES HERE</div>)}
        </div>
        <div>
          <h3>{ name.current }</h3>
          <button className="profile-button" type="button" onClick={() => { setAccount(true); }}>
            Account
          </button>
          <button className="profile-button" type="button" onClick={handlePrivacy}>
            { privacy }
          </button>
        </div>
        <div>
          <button className="request-button" type="button" onClick={handleRequest}>
            Request
          </button>
        </div>
      </div>
    );
  }
  
  export default Profile;