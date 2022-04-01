import React from 'react';
import {
  View, Text, TextInput, Button,
} from 'react-native';

function Request({ navigation }) {
  const handleFormSubmitRequest = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>
        What is your issue?
      </Text>
      <TextInput />
      <Button
        title="Report non-immediate emergency"
        onPress={(e) => handleFormSubmitRequest(e)}
      />
    </View>
  );
}

export default Request;
