/* eslint-disable no-use-before-define */
import {
  React, useState,
} from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  getMessages, addMessage,
} from '../modules/api';

function Message2({ route }) {
  const {
    accountName, secondName,
  } = route.params;

  const targetName = secondName;
  const [targetName2, setTargetName2] = useState('');
  let msgHistory = '';
  let arr = [];
  const [showMsg, setShowMsg] = useState([]);
  const d = new Date();

  function showMessages() {
    const msg = arr.map((element) => (
      <View key={element.id} style={styles.msgUser}>
        <Text>{element.data}</Text>
      </View>
    ));
    setShowMsg(msg);
  }

  async function handleDone() {
    arr = [];
    try {
      msgHistory = await getMessages(accountName, targetName);
      msgHistory.data.sort((a, b) => a.tme.localeCompare(b.tme));
      for (let i = 0; i < msgHistory.data.length; i += 1) {
        const temp = `${msgHistory.data[i].from}: ${msgHistory.data[i].msg}`;
        const index = i;
        arr.push({ id: index, data: temp });
      }
      showMessages();
    } catch {
      throw new Error('bad messaging 1: handleDone failed');
    }
  }

  async function handleDone2() {
    try {
      await addMessage(accountName, targetName, targetName2, d.getTime());
      handleDone();
    } catch {
      throw new Error('bad messaging 2: handleDone2 failed');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Messaging:
        {' '}
        {targetName}
      </Text>

      <View>
        {showMsg}
      </View>

      <Text style={styles.h2}>new message: </Text>

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

export default Message2;
