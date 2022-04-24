/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, Text, Button } from 'react-native';

function Profile({ route, navigation }) {
  const {
    accountName,
  } = route.params;

  const [friends, setFriends] = React.useState(false); // event if friends button was clicked
  const [tab, setTab] = React.useState('board'); // board or samaritan
  const [privacy, setPrivacy] = React.useState('Private');

  const handleTraining = () => {
    navigation.navigate('Training');
  };

  // const friendsList = Storage.getFriends(name.current); -
  // some array of friend objects with username, image
  const friendsList = [
    {
      profile: 'Joe',
      img: '',
    },
    {
      profile: 'Elmo',
      img: '',
    },
    {
      profile: 'Hi',
      img: '',
    },
    {
      profile: 'abc',
      img: '',
    },
  ];

  const handleRequest = () => {
    navigation.navigate('Request');
  };

  const handleAccount = () => {
    navigation.navigate('Account');
  };

  const handlePrivacy = () => {
    if (privacy === 'Private') {
      setPrivacy('Public');
    } else {
      setPrivacy('Private');
    }
  };

  const handleFriends = () => {
    if (friends) {
      setFriends(false);
    } else {
      setFriends(true);
    }
  };

  return (
    <View>
      <View>
        <Text>Good Samaritans</Text>
        <Button
          title="Friends"
          onPress={(e) => handleFriends(e)}
        />
        <Button
          title="Training"
          onPress={(e) => handleTraining(e)}
        />
      </View>

      <View>
        <Text>
          {(friends) ? (
            friendsList.map((user) => (
              <li key={user.profile}>
                {user.img}
                {' '}
                {user.profile}
              </li>
            ))
          ) : (
            <View>
              <Button
                title="Help Board"
                onPress={() => { setTab('board'); }}
              />
              <Button
                title="Samaritan Help"
                onPress={() => { setTab('samaritan'); }}
              />
              {(tab === 'board') ? (
                <Text>HELP POSTS GO HERE</Text>
              ) : (
                <Text>WHO YOU ARE CURRENTLY HELPING GOES HERE</Text>
              )}
            </View>
          )}
          ;
        </Text>
      </View>

      <View>
        <Text>
          Profile (
          {accountName}
          )
        </Text>
        <Button
          title="Account"
          onPress={(e) => handleAccount(e)}
        />
        <Button
          title={privacy}
          onPress={(e) => handlePrivacy(e)}
        />
        <Button
          title="Request"
          onPress={(e) => handleRequest(e)}
        />
      </View>
    </View>
  );
}

export default Profile;
