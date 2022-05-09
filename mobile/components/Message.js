/* eslint-disable no-use-before-define */
import {
  React, useState, useEffect, useRef,
} from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  getMessages, addMessage,
} from '../modules/api';

function Message({ route, navigation }) {
  const {
    accountName,
  } = route.params;

  const [goBack, setgoBack] = useState(false);
  const [target, setTarget] = useState(false);
  const [, setDone] = useState(false);
  const sentTarget = useRef(false);
  const [sent, setSent] = useState(false);
  const [tName, setTargetName] = useState('');
  const [tName2, setTargetName2] = useState('');
  const targetName = useRef('');
  const targetName2 = useRef('');
  let msgHistory = '';
  let arr = [];
  const MINUTE_MS = 5000;
  const [showMsg, setShowMsg] = useState([]);

  if (tName !== '') {
    targetName.current = tName;
  }

  if (tName2 !== '') {
    targetName2.current = tName2;
  }

  function showMessages() {
    const msg = arr.map((element) => (
      <View key={element.id} style={styles.msgUser}>
        <Text>{element.data}</Text>
      </View>
    ));
    setShowMsg(msg);
  }

  function handleSent() {
    sentTarget.current = true;
    if (sentTarget.current) {
      if (sent) {
        setSent(false);
      } else {
        setSent(true);
      }
    }
  }

  useEffect(() => {
    // gets all messages from person to message to
    async function handleDone() {
      arr = [];
      msgHistory = await getMessages(accountName, targetName.current);
      msgHistory.data.sort((a, b) => a.tme.localeCompare(b.tme));
      for (let i = 0; i < msgHistory.data.length; i += 1) {
        const temp = `${msgHistory.data[i].from}: ${msgHistory.data[i].msg}`;
        const index = i;
        arr.push({ id: index, data: temp });
      }

      setTarget(true);
      showMessages();
    }

    // adds messages
    async function handleDone2() {
      await addMessage(
        accountName,
        targetName.current,
        targetName2.current,
        (new Date()).getTime(),
      );
      handleDone();
    }

    if (sentTarget.current) {
      handleDone2();
      sentTarget.current = false;
    }
    const interval = setInterval(() => {
      handleDone();
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [sent]);

  // go back to profile
  const handleGoBack = () => {
    setgoBack(true);
  };

  if (goBack) {
    // WARNINGS KINDA JANK
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
          value={tName}
        />

        <TouchableOpacity onPress={() => setDone(true)} style={styles.button}>
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
        value={tName2}
      />

      <TouchableOpacity onPress={(e) => handleSent(e)} style={styles.button}>
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
