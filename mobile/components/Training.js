/* eslint-disable no-use-before-define */
import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';

function Training({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>
        Our first aid training gives you access to best-in-class instruction in
        three unique ways. Whether you prefer the interaction available in a traditional
        classroom setting, the freedom to learn at your own pace online, or want a
        combination of the two, our innovative classes can help you learn the material your
        way.
      </Text>
      <TouchableOpacity onPress={(e) => handleGoBack(e)} style={styles.button}>
        <Text style={styles.buttontext}>
          Go back to Profile
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
  h1: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5,
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
});

export default Training;
