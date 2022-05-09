/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import {
  React, useEffect, useState, useRef,
} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import {
  changePrivacy, getHelpPosts,
} from '../modules/api';

function Profile({ route, navigation }) {
  const {
    accountName, initialPrivacy, requests, helped,
  } = route.params;

  // const [account, setAccount] = useState(false);
  // const [request, setRequest] = useState(false);
  // const [message, setMessage] = useState(false);
  // const [myHelp, setMyHelp] = useState(false);
  // const [respond, setRespond] = useState(false);
  const name = useRef(accountName);
  const [privacy, setPrivacy] = useState(initialPrivacy);
  const helpBoard = useRef();
  const currentPostName = useRef();
  const currentPostDescription = useRef();

  // These two variables are not refreshing
  const [postCount, setPostCount] = useState(0);
  const [clickHB, setClickedHelpBoardButton] = useState(false);

  const requestsNo = requests; // no useRef, could change back
  const helpedNo = helped; // no useRef, could change back
  // console.log(`number of requests: ${requestsNo}`);
  // console.log(`clicked help board: ${clickHB}`);
  // console.log(postCount);

  useEffect(() => {
    async function privacyChange() {
      await changePrivacy(name.current, privacy);
    }
    privacyChange();
    async function initializeBoardPosts() {
      helpBoard.current = await getHelpPosts();
    }
    initializeBoardPosts();

    // console.log('in useeffect');
    // console.log(helpBoard.current);
    // console.log(privacy);
  }, [privacy, postCount]);

  /* //////////////////////
  * handle functions
  *//// ///////////////////

  const handlePrivacy = () => {
    if (privacy === 'Private') {
      setPrivacy('Public');
    } else {
      setPrivacy('Private');
    }
  };

  const handleTraining = () => {
    setClickedHelpBoardButton(false);
    setPostCount(0);
    navigation.navigate('Training');
  };

  const handleRequest = () => {
    setClickedHelpBoardButton(false);
    setPostCount(0);
    navigation.navigate('Request', {
      accountName,
      currentPrivacy: privacy,
      currentRequests: requestsNo,
    });
  };

  const handleAccount = () => {
    setClickedHelpBoardButton(false);
    setPostCount(0);
    navigation.navigate('Account', {
      accountName,
    });
  };

  const handleMyHelp = () => {
    setClickedHelpBoardButton(false);
    setPostCount(0);
    navigation.navigate('MyHelpPosts', {
      accountName,
    });
  };

  // Message {accountName, currentPrivacy, currentRequests}
  const handleMessage = () => {
    setClickedHelpBoardButton(false);
    setPostCount(0);
    navigation.navigate('Message', {
      accountName,
      // currentPrivacy: privacy,
      // currentRequests: requestsNo,
    });
  };

  // Message 2, {accountName, secondName}
  const handleRespond = () => {
    setClickedHelpBoardButton(false);
    setPostCount(0);
    navigation.navigate('MessageHelp', {
      accountName,
      secondName: currentPostName.current,
    });
  };

  const handleHelpButton = () => {
    setClickedHelpBoardButton(true);
    const x = helpBoard.current;
    currentPostName.current = x[postCount].name;
    currentPostDescription.current = x[postCount].post;
  };

  const handlePrevPost = () => {
    const currentCount = postCount;
    if (currentCount > 0) {
      const x = helpBoard.current;
      currentPostName.current = x[postCount - 1].name;
      currentPostDescription.current = x[postCount - 1].post;
      setPostCount(currentCount - 1);
    }
  };

  const handleNextPost = () => {
    const currentCount = postCount;
    if (currentCount < helpBoard.current.length - 1) {
      const x = helpBoard.current;
      currentPostName.current = x[postCount + 1].name;
      currentPostDescription.current = x[postCount + 1].post;
      setPostCount(currentCount + 1);
    }
  };

  /* //////////////////////
  * return stuff
  *//// ///////////////////

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.h1}>Good Samaritans</Text>
      </View>
      <View>
        <Text style={styles.h2}>{ name.current }</Text>
      </View>

      <View style={styles.buttonscontainer}>
        <TouchableOpacity onPress={(e) => handleTraining(e)} style={styles.button}>
          <Text style={styles.buttontext}>
            Training
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => handleMessage(e)} style={styles.button}>
          <Text style={styles.buttontext}>
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => handleMyHelp(e)} style={styles.button}>
          <Text style={styles.buttontext}>
            My Help Post
          </Text>
        </TouchableOpacity>

        <View style={styles.analytics}>
          <Text style={styles.h2}>User Analytics</Text>
          <View>
            <Text>
              Number of Requests Made:
              {' '}
              { requestsNo }
            </Text>
            <Text>
              Number Helped:
              {' '}
              { helpedNo }
              {' '}
            </Text>
            { }
          </View>
        </View>

        <TouchableOpacity onPress={(e) => handleHelpButton(e)} style={styles.button}>
          <Text style={styles.buttontext}>
            Live Help Posts
          </Text>
        </TouchableOpacity>
        <View>
          {clickHB ? (
            <View>
              <Text style={styles.h2}>
                {' '}
                { currentPostName.current }
                {': '}
              </Text>
              <Text style={styles.h3}>
                {' '}
                { currentPostDescription.current }
                {' '}
              </Text>
              <View style={styles.parentbutton}>
                <TouchableOpacity onPress={(e) => handlePrevPost(e)} style={styles.helpbutton}>
                  <Text style={styles.buttontext}>
                    Prev
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(e) => handleNextPost(e)} style={styles.helpbutton}>
                  <Text style={styles.buttontext}>
                    Next
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(e) => handleRespond(e)} style={styles.helpbutton}>
                  <Text style={styles.buttontext}>
                    Respond
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (<View />)}
        </View>

        <View>
          <TouchableOpacity onPress={(e) => handleAccount(e)} style={styles.button}>
            <Text style={styles.buttontext}>
              Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => handlePrivacy(e)} style={styles.button}>
            <Text style={styles.buttontext}>
              {privacy}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress={(e) => handleRequest(e)} style={styles.button}>
            <Text style={styles.buttontext}>
              Request
            </Text>
          </TouchableOpacity>
        </View>
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
    // backgroundColor: '#DADADA',
  },
  buttonscontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 5,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  h3: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
  },
  analytics: {
    padding: 2,
    marginTop: 10,
    textAlign: 'center',
    width: 250,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    backgroundColor: '#DADADA',
  },
  button: {
    marginTop: 10,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 10,
    paddingVertical: 10,
  },
  parentbutton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  helpbutton: {
    marginTop: 10,
    marginRight: 5,
    width: 100,
    alignItems: 'center',
    backgroundColor: '#800020',
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttontext: {
    textAlign: 'center',
    color: 'white',
  },
});

export default Profile;
