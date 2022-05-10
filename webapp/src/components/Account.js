/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import { React, useEffect, useState } from 'react';
import Profile from './Profile';
import { getProfile } from '../modules/api';
import '../assets/Account.css';

function Account({ accountName, currentPrivacy, currentRequests, currentHelped }) {
  const [profile, setProfile] = useState({ name: '123' });
  const [goBack, setgoBack] = useState(false);
  // let result = '';

  useEffect(() => {
    async function retrieveProfile() {
      const result = await getProfile(accountName);
      setProfile(result);
    }
    retrieveProfile();
  }, []);

  const handleGoBack = () => {
    setgoBack(true);
  };

  if (goBack) {
    return (
      <div className="Profile">
        <Profile
          accountName={accountName}
          initialPrivacy={currentPrivacy}
          requests={currentRequests}
          helped={currentHelped}
        />
      </div>
    );
  }
  return (
    <div className="account-section">
      <div className="account-page">
        <div className="account-title-container">
          <h1 className="account-title">Account Info</h1>
        </div>
        <div className="account-container">
          <p className="info-title">Name:</p>
          <div className="info-box">
            {profile.name}
          </div>
          <p className="info-title">Password:</p>
          <div className="info-box">
            {profile.password}
          </div>
          <p className="info-title">Street:</p>
          <div className="info-box">
            {profile.street}
          </div>
          <div className="info-state-country">
            <div className="state-account">
              <p className="state-info">State:</p>
              <div className="state-box">
                {profile.state}
              </div>
            </div>
            <div className="country-account">
              <p className="country-info">Country:</p>
              <div className="country-box">
                {profile.country}
              </div>
            </div>
          </div>
          <p className="info-title">Zip:</p>
          <div className="info-box">
            {profile.zip}
          </div>
        </div>
        <button className="submit-button" type="submit" onClick={handleGoBack}>
          <div>
            Go Back to Profile
          </div>
        </button>
      </div>
    </div>
  );
}

export default Account;
