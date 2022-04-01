import React from 'react';
import {
  View, Text, TextInput, Button, Alert,
} from 'react-native';

function Login({ navigation }) {
  const [userName, setUserName] = React.useState('');
  const [userPass, setUserPass] = React.useState('');

  // remove console.log after, also remove from .eslint.js
  function handleFormSubmit() {
    const regEx = /^[a-z0-9A-Z ]+$/;
    if (userName.match(regEx)) {
      navigation.navigate('Profile', {
        accountName: userName,
      });
    } else {
      Alert.alert('must fill all values properly and alphanumerically');
    }
  }

  return (
    <View>
      <Text>
        Full Name:
      </Text>
      <TextInput
        onChangeText={setUserName}
        value={userName}
      />
      <Text>
        Password:
      </Text>
      <TextInput
        onChangeText={setUserPass}
        value={userPass}
      />
      <Button
        title="Login"
        onPress={(e) => handleFormSubmit(e)}
      />
    </View>
  );
}

export default Login;
