import {
  React, useState, useEffect,
} from 'react';
import {
  View, Text,
} from 'react-native';

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
    <View>
      { seconds === 0 ? (
        navigation.goBack()
      ) : (<Text>ACCOUNT LOCKED OUT</Text>) }
    </View>
  );
}

export default Lockout;
