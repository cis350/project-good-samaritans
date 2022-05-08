/* eslint-disable no-use-before-define */
import {
  React, useState, useEffect,
} from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  getMessages, addMessage,
} from '../modules/api';

// const {
//   accountName, currentPrivacy, currentRequests,
// } = route.params;

function Message({ route, navigation }) {
  const {
    accountName,
  } = route.params;

  const [goBack, setgoBack] = useState(false);
  const [target, setTarget] = useState(false);
  const [targetName, setTargetName] = useState('');
  const [targetName2, setTargetName2] = useState('');
  let msgHistory = '';
  let arr = [];
  const [showMsg, setShowMsg] = useState([]);
  const MINUTE_MS = 5000;

  function showMessages() {
    const msg = arr.map((element) => (
      <View key={element.id} style={styles.msgUser}>
        <Text>{element.data}</Text>
      </View>
    ));
    setShowMsg(msg);
  }

  // gets all messages from person to message to
  async function handleDone() {
    arr = [];
    console.log('target:', targetName);
    console.log('account:', accountName);
    try {
      msgHistory = await getMessages(accountName, targetName);
      msgHistory.data.sort((a, b) => a.tme.localeCompare(b.tme));
      for (let i = 0; i < msgHistory.data.length; i += 1) {
        const temp = `${msgHistory.data[i].from}: ${msgHistory.data[i].msg}`;
        const index = i;
        arr.push({ id: index, data: temp });
      }
      setTarget(true);
      showMessages();
    } catch {
      throw new Error('bad messaging 1: handleDone failed');
    }
  }

  // adds messages
  async function handleDone2() {
    try {
      await addMessage(accountName, targetName, targetName2, (new Date()).getTime());
      handleDone();
    } catch {
      throw new Error('bad messaging 2: handleDone2 failed');
    }
  }

  // updates live messages
  useEffect(() => {
    const interval = setInterval(() => {
      // targetName still blank for some reasons
      if (targetName !== '') {
        handleDone();
      } else {
        console.log('NOT UPDATING CORRECTLY');
      }
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);

  // go back to profile page
  const handleGoBack = () => {
    setgoBack(true);
  };

  if (goBack) {
    // DOESN'T WORK
    navigation.goBack();
  }
  if (!target) {
    return (
      <View style={styles.container}>
        <Text style={styles.h1}>
          Hello
          {' '}
          {accountName}
          !
        </Text>
        <Text style={styles.h2}> Who would you like to message?</Text>
        <TextInput
          style={styles.textinput}
          onChangeText={setTargetName}
          value={targetName}
        />

        <TouchableOpacity onPress={(e) => handleDone(e)} style={styles.button}>
          <Text style={styles.buttontext}>
            Message
          </Text>
        </TouchableOpacity>

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
        {showMsg}
      </View>

      <Text style={styles.h1}>new message: </Text>

      <TextInput
        style={styles.textinput}
        onChangeText={setTargetName2}
        value={targetName2}
      />

      <TouchableOpacity onPress={(e) => handleDone2(e)} style={styles.button}>
        <Text style={styles.buttontext}>
          Message
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={(e) => handleGoBack(e)} style={styles.button}>
        <Text style={styles.buttontext}>
          Go Back to Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 24,
  },
  msgUser: {
    backgroundColor: '#0078fe',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    // marginLeft: '45%',
    // // marginBottom: 15,
    // marginRight: '5%',
    // maxWidth: '50%',
    // alignSelf: 'flex-end',
    // // maxWidth: 500,
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  h3: {
    fontSize: 20,
    padding: 5,
    fontWeight: 'bold',
    color: '#800020',
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
  textinput: {
    width: 200,
    padding: 8,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#DADADA',
  },
});

export default Message;
