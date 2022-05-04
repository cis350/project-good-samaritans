import { React, useEffect, useState } from 'react';
import {
  View, Text, Button,
} from 'react-native';
import { getProfile } from '../modules/api';

function Account({ route, navigation }) {
  const {
    accountName,
  } = route.params;

  // // remove later
  // console.log(currentPrivacy);
  // console.log(currentRequests);

  const [profile, setProfile] = useState({ name: '123' });
  let result = '';

  useEffect(async () => {
    result = await getProfile(accountName);
    setProfile(result);
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>
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
        ZIP:
        <br />
        {profile.zip}
        <br />
        Password:
        <br />
        {profile.password}
        <br />
      </Text>
      <Button
        title="Go Back to Profile"
        onPress={(e) => handleGoBack(e)}
      />
    </View>
  );
}

export default Account;
