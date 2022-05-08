import {
  React, useState, useEffect,
} from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 24,
    backgroundColor: '#DADADA',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 24,
  },
});

function Lockout({ navigation }) {
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <View style={styles.container}>
      { seconds === 0 ? (
        navigation.goBack()
      ) : (<Text style={styles.title}>ACCOUNT LOCKED OUT</Text>) }
    </View>
  );
}

export default Lockout;
