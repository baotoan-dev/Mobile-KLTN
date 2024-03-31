import { View, SafeAreaView, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import { useState } from 'react';
import { Color } from '../../utils/Color';
import { Button } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../App';
import * as SecureStore from 'expo-secure-store';
import HeaderProfile from './HeaderProfile/HeaderProfile';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const { auth, setAuth } = useContext(AuthContext);
  const { profile, loading, error } = useSelector(state => state.profile);

  SecureStore.getItemAsync('token').then((value) => {
    setToken(value);
  });

  const handleLogout = () => {
    console.log('logout');
    SecureStore.deleteItemAsync('token');
    SecureStore.deleteItemAsync('refreshToken');
    setAuth(false);
    setToken('');
  }

  useEffect(() => {
    dispatch(getProfileAction('vi'));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <HeaderProfile profile={profile} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
  },
  header: {
    height: 200,
  },
})