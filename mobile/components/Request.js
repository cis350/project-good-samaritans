import { React, useState } from 'react';
import {
  View, Text, TextInput, Button,
} from 'react-native';
import { incrementRequest, postRequest } from '../modules/api';

function Request({ route, navigation }) {
  const {
    accountName, currentPrivacy, currentRequests,
  } = route.params;

  const [requ, setRequ] = useState(false);
  const [reqPost, setreqPost] = useState(false);

  function sendRequest() {
    postRequest(accountName, reqPost);
    incrementRequest(accountName);
    setRequ(true);
  }

  const nexreq = currentRequests + 1;
  const handleGoBack = () => {
    navigation.navigate('Profile', {
      accountName,
      initialPrivacy: currentPrivacy,
      requests: nexreq,
    });
  };

  if (requ) {
    return (
      <View>
        <Text>Request sent</Text>
        <Button
          title="Go Back to Profile"
          onPress={(e) => handleGoBack(e)}
        />
      </View>
    );
  }

  return (
    <View>
      <Text>
        What is your issue
        {' '}
        {accountName}
      </Text>
      <TextInput
        onChangeText={setreqPost}
        value={reqPost}
      />
      <Button
        title="Report non-immediate emergency"
        onPress={(e) => sendRequest(e)}
      />
    </View>
  );
}

export default Request;
