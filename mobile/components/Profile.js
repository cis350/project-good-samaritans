/* eslint-disable no-nested-ternary */
import {
  React, useEffect, useState, useRef,
} from 'react';
import { View, Text, Button } from 'react-native';
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
      currentPrivacy: privacy,
      currentRequests: requestsNo,
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
    <View>
      <View>
        <Text>Good Samaritans</Text>
      </View>

      <View>
        <Button
          title="Training"
          onPress={(e) => handleTraining(e)}
        />
        <View>
          <Button
            title="Message"
            onPress={(e) => handleMessage(e)}
          />
        </View>
        <View>
          <Button
            title="My Help Posts"
            onPress={(e) => handleMyHelp(e)}
          />
        </View>
        <View>
          <Text>User Analytics</Text>
          <Text>
            <p>
              Number of Requests Made:
              {' '}
              { requestsNo }
            </p>
            <p>
              Number Helped:
              { helpedNo }
              {' '}
            </p>
            { }
          </Text>
        </View>
      </View>

      <View>
        <Button
          title="Help Posts"
          onPress={(e) => handleHelpButton(e)}
        />
        {clickHB ? (
          <View>
            <Text>
              { currentPostName.current }
              {'\n'}
              { currentPostDescription.current }
            </Text>
            <Button
              title="Respond"
              onPress={(e) => handleRespond(e)}
            />
            <Button
              title="Next"
              onPress={(e) => handleNextPost(e)}
            />
            <Button
              title="Prev"
              onPress={(e) => handlePrevPost(e)}
            />
          </View>
        ) : (<View />)}
      </View>

      <View>
        <View>
          <Text>{ name.current }</Text>
        </View>
        <Button
          title="Account"
          onPress={(e) => handleAccount(e)}
        />
        <Button
          title={privacy}
          onPress={(e) => handlePrivacy(e)}
        />
      </View>

      <View>
        <Button
          title="Request"
          onPress={(e) => handleRequest(e)}
        />
      </View>

    </View>
  );
}

export default Profile;
