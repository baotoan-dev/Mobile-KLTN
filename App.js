import { StyleSheet, LogBox } from 'react-native';
import Navigation from './StackNavigation';
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as SecureStore from 'expo-secure-store';
import ChatContextProvider from './contex/ChatContex';
// import messaging from '@react-native-firebase/messaging';

export const AuthContext = createContext();

export default function App() {

  const [auth, setAuth] = useState(false);
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();

  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync('token');

    if (token) {
      setAuth(true);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }

  // useEffect(() => {
  //   if (requestUserPermission) {
  //     messaging().getToken().then(token => {
  //       console.log(token);
  //     });
  //   }
  //   else {
  //     console.log('no token');
  //   }

  //   messaging()
  //     .getInitialNotification()
  //     .then(async (remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });

  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   })

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);
  return (
    <Provider store={store}>
      <ChatContextProvider>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Navigation />
        </AuthContext.Provider>
      </ChatContextProvider>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
