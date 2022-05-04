import {
  React, useState,
} from 'react';
import {
  View, Text, TextInput, Button, Alert,
} from 'react-native';
import {
  getLoginTrue, getPasswordTrue, changePassword, getProfile,
} from '../modules/api';

function Login({ navigation }) {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');
  const [userNewPass, setUserNewPass] = useState('');
  const [mistakes, setMistakes] = useState(0);
  const [forgot, setForgot] = useState(false);
  let loggedIn = false;
  let passwordCheck = true;

  function handleSignUp() {
    navigation.navigate('Signup');
  }

  function handleChangePassword() {
    changePassword(userName, userNewPass);
    setForgot(false);
  }

  async function handleFormSubmit() {
    try {
      loggedIn = await getLoginTrue(userName, userPass);
      passwordCheck = await getPasswordTrue(userName, userPass);

      if (loggedIn) {
        const result = await getProfile(userName);

        // navigates to Profile page
        navigation.navigate('Profile', {
          accountName: userName,
          initialPrivacy: result.privacy,
          requests: result.requestsNo,
          helped: result.helpedNo,
        });
      } else if (!passwordCheck) {
        const count = mistakes + 1;
        setMistakes(count);

        console.log('incorrect password');
        Alert.alert('incorrect password');
      } else {
        console.log('wrong username or password');
        Alert.alert('wrong username or password');
      }
    } catch {
      console.log('error with connection');
      Alert.alert('error with connection');
    }
  }

  // Actual rendering
  if (mistakes >= 3) {
    navigation.navigate('Lockout');
  }
  if (forgot) {
    return (
      <View>
        <Text>
          Username:
        </Text>
        <TextInput
          onChangeText={setUserName}
          value={userName}
        />
        <Text>
          New Password:
        </Text>
        <TextInput
          onChangeText={setUserNewPass}
          value={userNewPass}
        />
        <Button
          title="Reset Password"
          onPress={(e) => handleChangePassword(e)}
        />
      </View>
    );
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
      <Button
        title="Forgot Password?"
        onPress={() => setForgot(true)}
      />
      <Text>
        Do not have an acount? Signup
      </Text>
      <Button
        title="Signup"
        onPress={(e) => handleSignUp(e)}
      />
    </View>
  );
}

export default Login;
