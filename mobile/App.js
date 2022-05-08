import { React } from 'react';

/* INSTALL THESE
* npm install react-native-screens react-native-safe-area-context
* npm install @react-navigation/native
* npm install @react-navigation/native-stack */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Account from './components/Account';
import Lockout from './components/Lockout';
import Login from './components/Login';
import Message from './components/Message';
import MessageHelp from './components/MessageHelp';
import MyHelpPosts from './components/MyHelpPosts';
import Profile from './components/Profile';
import Request from './components/Request';
import Signup from './components/Signup';
import Training from './components/Training';

// create a navigation stack
const Stack = createNativeStackNavigator();
// Stack.headerLeft = null;
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Group
          screenOptions={() => ({
            presentation: 'modal',
            header: () => null,
            gestureEnabled: false,
            // headerLeft: () => null,
            // headerTitle: () => null,
          })}
        >
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Lockout" component={Lockout} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Message" component={Message} />
          <Stack.Screen name="MessageHelp" component={MessageHelp} />
          <Stack.Screen name="MyHelpPosts" component={MyHelpPosts} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Request" component={Request} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Training" component={Training} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
