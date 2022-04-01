import { React } from 'react';

/* INSTALL THESE
* npm install react-native-screens react-native-safe-area-context
* npm install @react-navigation/native
* npm install @react-navigation/native-stack */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Training from './components/Training';
import Request from './components/Request';

// create a navigation stack
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Training" component={Training} />
        <Stack.Screen name="Request" component={Request} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
