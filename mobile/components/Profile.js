import React from 'react';
import { View, Text, Button } from 'react-native';

function Profile({ route, navigation }) {
  const {
    accountName,
  } = route.params;

  // const [, setFriends] = React.useState(false); // event if friends button was clicked
  const [tab, setTab] = React.useState('board'); // board or samaritan
  // const [, setAccount] = React.useState(false); // event if the account button was clicked
  const [privacy, setPrivacy] = React.useState('Private');

  const handleTraining = () => {
    navigation.navigate('Training');
  };

  const handleRequest = () => {
    navigation.navigate('Request');
  };

  const handlePrivacy = () => {
    if (privacy === 'Private') {
      setPrivacy('Public');
    } else {
      setPrivacy('Private');
    }
  };

  return (
    <View>
      <View>
        <Text>Good Samaritans</Text>
        <Button
          title="Friends"
        />
        <Button
          title="Training"
          onPress={(e) => handleTraining(e)}
        />
      </View>

      <View>
        <Button
          title="Help Board"
          onPress={() => { setTab('board'); }}
        />
        <Button
          title="Samaritan Help"
          onPress={() => { setTab('samaritan'); }}
        />
        <Text>
          {(tab === 'board') ? (<Text>HELP POSTS GO HERE</Text>) : (<Text>WHO YOU ARE CURRENTLY HELPING GOES HERE</Text>)}
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
