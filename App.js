import { StyleSheet, LogBox } from 'react-native';
import Navigation from './StackNavigation';
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import * as SecureStore from 'expo-secure-store';
import ChatContextProvider from './contex/ChatContex';

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
