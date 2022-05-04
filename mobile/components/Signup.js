import { React, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, View, Text, TextInput, Button, Alert,
} from 'react-native';
import { addUser, getProfile } from '../modules/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
      <Text>
        Enter Account Information
      </Text>

      <Text>
        Full Name:
      </Text>
      <TextInput
        onChangeText={setUserInput}
        value={userInput}
      />

      <Text>
        Password:
      </Text>
      <TextInput
        onChangeText={setPwd}
        value={userPwd}
      />

      <Text>
        Street:
      </Text>
      <TextInput
        onChangeText={setUserInputStreet}
        value={userInputStreet}
      />

      <Text>
        State:
      </Text>
      <TextInput
        onChangeText={setUserInputState}
        value={userInputState}
      />

      <Text>
        Country:
      </Text>
      <TextInput
        onChangeText={setUserInputCountry}
        value={userInputCountry}
      />

      <Text>
        Zipcode:
      </Text>
      <TextInput
        onChangeText={setUserInputZIP}
        value={userInputZIP}
      />

      <Text>
        Covid vaccination record:
      </Text>
      <TextInput
        onChangeText={setUserInputCOVID}
        value={userInputCOVID}
      />
      <Button
        title="Sign Up"
        onPress={(e) => handleFormSubmit(e)}
      />
      <StatusBar style={{ align: 'auto' }} />
    </View>
  );
}

export default Signup;
