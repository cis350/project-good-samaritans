/* eslint-disable no-use-before-define */
import {
  React, useEffect, useState,
} from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import { deleteHelp, getSpecificHelp } from '../modules/api';

function MyHelpPosts({ route, navigation }) {
  const {
    accountName,
  } = route.params;
  const [targetName, setTargetName] = useState('');
  const [posts, setPosts] = useState('');
  const [goBack, setGoBack] = useState(false);
  const [noPost, setNoPost] = useState(true);
  // const MINUTE_MS = 5000;

  function handleGoBack() {
    setGoBack(true);
  }

  async function handleHelpPost() {
    await deleteHelp(accountName, posts, targetName);
    setGoBack(true);
  }

  useEffect(() => {
    let hlp = '';
    async function handleGet() {
      try {
        hlp = await getSpecificHelp(accountName);
        if (hlp !== undefined) {
          setPosts(hlp.data[0].post);
          setNoPost(false);
        }
      } catch {
        // still no post
        setNoPost(true);
      }
    }
    handleGet();

    // // Come back to this later
    // if (hlp !== undefined) {
    //   const interval = setInterval(() => {
    //     handleGet();
    //   }, MINUTE_MS);
    //   return () => clearInterval(interval);
    // }
    // return 0;
  }, []);

  if (goBack) {
    // Cannot update a component (`ForwardRef(BaseNavigationContainer)`)
    // while rendering a different component (`MyHelpPosts`)
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Your Help Post:</Text>
      <View style={styles.requestbox}>
        {!noPost ? (
          <View>
            <Text style={styles.h3}>
              {posts}
            </Text>

            <Text style={styles.h2}>Which user resolved your post?:</Text>
            <TextInput
              style={styles.textinput}
              onChangeText={setTargetName}
              value={targetName}
            />

            <TouchableOpacity onPress={(e) => handleHelpPost(e)} style={styles.button}>
              <Text style={styles.buttontext}>
                Resolved By?
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text>No Post Yet</Text>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={(e) => handleGoBack(e)} style={styles.button}>
        <Text style={styles.buttontext}>
          Go Back to Profile?
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
  requestbox: {
    padding: 24,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
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
    width: 100,
    padding: 8,
    marginTop: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#DADADA',
  },
});

export default MyHelpPosts;
