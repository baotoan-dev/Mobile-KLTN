import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './StackNavigation';
import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

export const AuthContext = createContext();

export default function App() {

  const [auth, setAuth] = useState(false);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log('token', token);
    if (token) {
      setAuth(true);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Navigation />
      </AuthContext.Provider>
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
