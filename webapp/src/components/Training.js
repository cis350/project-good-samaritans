/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-cycle */
import { React, useEffect, useState } from 'react';
import Profile from './Profile';
import { getProfile } from '../modules/api';
import '../assets/Training.css';

function Training({ accountName, currentPrivacy, currentRequests }) {
  const [profile, setProfile] = useState({ name: '123' });
  const [goBack, setgoBack] = useState(false);
  let result = '';

  useEffect(async () => {
    result = await getProfile(accountName);
    setProfile(result);
  }, []);

  const handleGoBack = () => {
    setgoBack(true);
  };

  if (goBack) {
    return (
      <div className="Profile">
        <Profile
          accountName={profile.name}
          initialPrivacy={currentPrivacy}
          requests={currentRequests}
        />
      </div>
    );
  }

  return (
    <div className="training-section">
      <div className="training-page">
        <div className="training-title-container">
          <h1 className="training-title">Training Page</h1>
        </div>
        <div className="training-container">
          <p className="training-description">
            Our first aid training gives you access to
            best-in-class instruction in three unique
            ways. Whether you prefer the interaction
            available in a traditional classroom setting,
            the freedom to learn at your own pace online,
            or want a combination of the two, our innovative
            classes can help you learn the material your way.
            {' '}
          </p>
          <div className="training-lessons">
            <p>Training Incoming...</p>
          </div>
        </div>
        <button className="submit-button" type="submit" onClick={handleGoBack}>
          Go Back to Profile
        </button>
      </div>
    </div>
  );
}

export default Training;
