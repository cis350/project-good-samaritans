import { React, useEffect, useState } from 'react';

import {
  getProfile,
} from '../modules/api';

function Account({ user }) {
  const [profile, setProfile] = useState({ name: '123' });

  useEffect(async () => {
    const result = await getProfile(user);
    setProfile(result);
  }, []);

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
    </div>
  );
}

export default Account;
