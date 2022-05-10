/* eslint-disable no-use-before-define */
import {
  React, useState,
} from 'react';
import {
  View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, LogBox,
} from 'react-native';
import {
  getLoginTrue, getPasswordTrue, changePassword, getProfile,
} from '../modules/api';

function Login({ navigation }) {
  LogBox.ignoreAllLogs();
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
    setMistakes(0);
    navigation.navigate('Lockout');
  }
  if (forgot) {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <Text>
            Username:
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={setUserName}
            value={userName}
          />
          <Text>
            New Password:
          </Text>
          <TextInput
            style={styles.textinput}
            onChangeText={setUserNewPass}
            value={userNewPass}
          />
          <TouchableOpacity onPress={(e) => handleChangePassword(e)} style={styles.button}>
            <Text style={styles.buttontext}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Good Samaritans
      </Text>
      <View style={styles.box}>
        <Text>
          Username:
        </Text>
        <TextInput
          style={styles.textinput}
          onChangeText={setUserName}
          value={userName}
        />
        <Text>
          Password:
        </Text>
        <TextInput
          style={styles.textinput}
          onChangeText={setUserPass}
          value={userPass}
        />
        <TouchableOpacity onPress={(e) => handleFormSubmit(e)} style={styles.button}>
          <Text style={styles.buttontext}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setForgot(true)} style={styles.button}>
          <Text style={styles.buttontext}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <Text>
          Do not have an account?
        </Text>
        <TouchableOpacity onPress={(e) => handleSignUp(e)} style={styles.button}>
          <Text style={styles.buttontext}>
            Sign up
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
    backgroundColor: '#DADADA',
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

export default Login;
