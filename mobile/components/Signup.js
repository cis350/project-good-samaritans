/* eslint-disable no-use-before-define */
import { React, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, View, Text, TextInput, Alert, TouchableOpacity,
} from 'react-native';
import { addUser, getProfile } from '../modules/api';

function Signup({ navigation }) {
  const [userInput, setUserInput] = useState('');
  const [userPwd, setPwd] = useState('');
  const [userInputStreet, setUserInputStreet] = useState('');
  const [userInputState, setUserInputState] = useState('');
  const [userInputCountry, setUserInputCountry] = useState('');
  const [userInputZIP, setUserInputZIP] = useState('');
  const [userInputCOVID, setUserInputCOVID] = useState('');
  const d = new Date();
  let exists = null;

  // remove console.log after, also remove from .eslint.js
  async function handleFormSubmit() {
    try {
      exists = await getProfile(userInput);
      if (exists != null) {
        console.log('username already exists');
        Alert.alert('username already exists');
        return;
      }

      if (/^[a-z0-9A-Z ]+$/.test(userInput)) {
        const date = {
          year: d.getFullYear(),
          month: d.getMonth(),
          day: d.getDay(),
        };
        addUser(
          userInput,
          userInputStreet,
          userInputState,
          userInputCountry,
          userInputZIP,
          userPwd,
          'Private',
          date,
          0,
          0,
        );
        // navigate back to Login Page
        navigation.goBack();
      } else {
        Alert.alert('must fill all values properly and alphanumerically');
      }
    } catch {
      Alert.alert('error submitting');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Enter Account Information
      </Text>

      <Text>
        Full Name:
      </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={setUserInput}
        value={userInput}
      />

      <Text>
        Password:
      </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={setPwd}
        value={userPwd}
      />

      <Text>
        Street:
      </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={setUserInputStreet}
        value={userInputStreet}
      />

      <Text>
        State:
      </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={setUserInputState}
        value={userInputState}
      />

      <Text>
        Country:
      </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={setUserInputCountry}
        value={userInputCountry}
      />

      <Text>
        Zipcode:
      </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={setUserInputZIP}
        value={userInputZIP}
      />

      <Text>
        Covid vaccination record:
      </Text>
      <TextInput
        style={styles.textinput}
        onChangeText={setUserInputCOVID}
        value={userInputCOVID}
      />
      <TouchableOpacity onPress={(e) => handleFormSubmit(e)} style={styles.button}>
        <Text style={styles.buttontext}>
          Sign up
        </Text>
      </TouchableOpacity>
      <StatusBar style={{ align: 'auto' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 24,
  },
  textinput: {
    padding: 8,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#DADADA',
  },
  button: {
    marginTop: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 50,
    paddingVertical: 10,
  },
  buttontext: {
    textAlign: 'center',
    color: 'white',
  },
});

export default Signup;
