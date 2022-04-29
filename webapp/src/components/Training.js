/* eslint-disable import/no-cycle */
import { React, useEffect, useState } from 'react';
import Profile from './Profile';
import { getProfile } from '../modules/api';

function Training({ accountName }) {
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
        <Profile accountName={profile.name} />
      </div>
    );
  }

  return (
    <div>
      <b>Training Page</b>
      <br />
      <b>Our first aid training gives you access to best-in-class instruction in </b>
      <b>three unique ways. Whether you prefer the interaction available in a traditional </b>
      <b>classroom setting, the freedom to learn at your own pace online, or want a combination </b>
      <b>of the two, our innovative classes can help you learn the material your way.</b>
      <br />
      <button type="submit" onClick={handleGoBack}>
        <div>
          Go Back to Profile
        </div>
      </button>
    </div>
  );
}

export default Training;
