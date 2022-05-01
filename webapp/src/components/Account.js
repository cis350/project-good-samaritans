/* eslint-disable import/no-cycle */
import { React, useEffect, useState } from 'react';
import Profile from './Profile';
import { getProfile } from '../modules/api';

function Account({ accountName, currentPrivacy, currentRequests }) {
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
          accountName={accountName}
          initialPrivacy={currentPrivacy}
          requests={currentRequests}
        />
      </div>
    );
  }
  return (
    <div>
      <b>Account info</b>
      <br />
      Name:
      <br />
      {profile.name}
      <br />
      Country:
      <br />
      {profile.country}
      <br />
      State:
      <br />
      {profile.state}
      <br />
      Street:
      <br />
      {profile.street}
      <br />
      Password:
      <br />
      {profile.password}
      <br />
      <button type="submit" onClick={handleGoBack}>
        <div>
          Go Back to Profile
        </div>
      </button>
    </div>
  );
}

export default Account;
