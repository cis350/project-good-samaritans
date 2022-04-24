import { React } from 'react';
import {
  View, Text, Button,
} from 'react-native';

function Account({ navigation }) {
  const handleFormGoBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Text>
        Account info
        Name:
        Country:
        State:
        Street:
        Password:
      </Text>
      <Button
        title="Go Back to Profile"
        onPress={(e) => handleFormGoBack(e)}
      />
    </View>
  );
}

export default Account;
