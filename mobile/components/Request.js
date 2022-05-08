/* eslint-disable no-use-before-define */
import { React, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import { incrementRequest, postRequest } from '../modules/api';

function Request({ route, navigation }) {
  const {
    accountName, currentPrivacy, currentRequests,
  } = route.params;

  const [requ, setRequ] = useState(false);
  const [reqPost, setreqPost] = useState('');

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
      <View style={styles.container}>
        <Text style={styles.title}>Request sent</Text>
        <TouchableOpacity onPress={(e) => handleGoBack(e)} style={styles.button}>
          <Text style={styles.buttontext}>
            Go Back to Profile
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          What is your issue
          {' '}
          {accountName}
        </Text>
        <TextInput
          style={styles.textinput}
          onChangeText={setreqPost}
          value={reqPost}
        />
      </View>
      <View>
        <TouchableOpacity onPress={(e) => sendRequest(e)} style={styles.button}>
          <Text style={styles.buttontext}>
            Report non-immediate emergency
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 24,
    // backgroundColor: '#DADADA',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 24,
  },
  textinput: {
    padding: 50,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#DADADA',
  },
  box: {
    padding: 24,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 10,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttontext: {
    textAlign: 'center',
    color: 'white',
  },
});

export default Request;
