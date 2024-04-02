import { View, SafeAreaView, ScrollView, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import { useState } from 'react';
import { AuthContext } from '../../App';
import * as SecureStore from 'expo-secure-store';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import ContentProfile from './ContentProfile/ContentProfile';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const { auth, setAuth } = useContext(AuthContext);
  const { profile, loading, error } = useSelector(state => state.profile);
  const [isScrolling, setIsScrolling] = useState(false);
  const [dataProfile, setDataProfile] = useState({});

  useEffect(async () => {
    const token = await SecureStore.getItemAsync('token');
    console.log('token', token);
    setToken(token);
  }, []);

  const handleLogout = () => {
    console.log('logout');
    SecureStore.deleteItemAsync('token');
    SecureStore.deleteItemAsync('refreshToken');
    setAuth(false);
    setToken('');
  }

  useEffect(() => {
    dispatch(getProfileAction('vi'));
  }, [token]);

  useEffect(() => {
    if (profile) {
      setDataProfile(profile);
    }
  }, [profile]);

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <HeaderProfile profile={profile} isScrolling={isScrolling} />
        </View>
        <ContentProfile profile={profile} setIsScrolling={setIsScrolling} isScrolling={isScrolling}/>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
  },
  header: {
    alignContent: 'flex-start',
  },
})