import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, View, Text, TextInput, Button, Alert,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Signup({ navigation }) {
  const [userInput, setUserInput] = React.useState('');
  const [userInputPwd, setUserInputPwd] = React.useState('');
  const [userInputStreet, setUserInputStreet] = React.useState('');
  const [userInputState, setUserInputState] = React.useState('');
  const [userInputCountry, setUserInputCountry] = React.useState('');
  const [userInputZIP, setUserInputZIP] = React.useState('');
  const [userInputCOVID, setUserInputCOVID] = React.useState('');

  // remove console.log after, also remove from .eslint.js
  function handleFormSubmit() {
    const regEx = /^[a-z0-9A-Z ]+$/;
    if (userInput.match(regEx)) {
      // console.log(userInput);
      // console.log(userInputStreet);
      // console.log(userInputState);
      // console.log(userInputCountry);
      // console.log(userInputZIP);
      // console.log(userInputCOVID);

      navigation.navigate('Profile', {
        accountName: userInput,
      });
    } else {
      Alert.alert('must fill all values properly and alphanumerically');
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
        onChangeText={setUserInputPwd}
        value={userInputPwd}
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
