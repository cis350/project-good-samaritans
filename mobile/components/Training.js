import React from 'react';
import { View, Text, Button } from 'react-native';

function Training({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Text>
        Our first aid training gives you access to best-in-class instruction in
        three unique ways. Whether you prefer the interaction available in a traditional
        classroom setting, the freedom to learn at your own pace online, or want a
        combination of the two, our innovative classes can help you learn the material your
        way.
      </Text>
      <Button
        title="Go back to Profile"
        onPress={(e) => handleGoBack(e)}
      />
    </View>
  );
}

export default Training;
