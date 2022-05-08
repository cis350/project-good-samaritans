/* eslint-disable no-use-before-define */
import {
  React, useEffect, useState,
} from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { getProfile } from '../modules/api';

function Account({ route, navigation }) {
  const {
    accountName,
  } = route.params;
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(true);
  // let result = '';
  // const result = useRef();

  useEffect(() => {
    async function handleGet() {
      try {
        const result = await getProfile(accountName);
        if (result !== undefined) {
          setProfile(result);
          setLoading(false);
        }
      } catch {
        setLoading(true);
      }
    }
    handleGet();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      {!loading ? (
        <View style={styles.container}>
          <Text>
            <Text style={styles.h1}>Account info</Text>
            {'\n'}
            <Text style={styles.h2}>Name:</Text>
            {' '}
            {profile.name}
            {'\n'}
            <Text style={styles.h2}>Country:</Text>
            {' '}
            {profile.country}
            {'\n'}
            <Text style={styles.h2}>State:</Text>
            {' '}
            {profile.state}
            {'\n'}
            <Text style={styles.h2}>Street:</Text>
            {' '}
            {profile.street}
            {'\n'}
            <Text style={styles.h2}>ZIP:</Text>
            {' '}
            {profile.zip}
            {'\n'}
            <Text style={styles.h2}>Password:</Text>
            {' '}
            {profile.password}
            {'\n'}
          </Text>
          <TouchableOpacity onPress={(e) => handleGoBack(e)} style={styles.button}>
            <Text style={styles.buttontext}>
              Go Back to Profile
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text>getProfile() failed</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 24,
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

export default Account;
