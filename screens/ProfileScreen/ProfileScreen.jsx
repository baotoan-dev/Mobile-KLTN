import { View, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import { useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import HeaderProfile from './HeaderProfile/HeaderProfile';
import ContentProfile from './ContentProfile/ContentProfile';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const { profile } = useSelector(state => state.profile);
  const [isScrolling, setIsScrolling] = useState(false);
  const [dataProfile, setDataProfile] = useState({});

  useEffect(async () => {
    const token = await SecureStore.getItemAsync('token');
    setToken(token);
  }, []);

  useEffect(() => {
    dispatch(getProfileAction('vi'));
  }, [token]);

  useEffect(() => {
    if (profile) {
      setDataProfile(profile);
    }
  }, [profile]);

  const handleScroll = (event) => {
    if (event.nativeEvent.contentOffset.y > 0) {
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
      }}
    >
      <HeaderProfile isScrolling={isScrolling} />
      <ScrollView showsVerticalScrollIndicator={false} onScroll={handleScroll} style={styles.container}>
        <ContentProfile profile={dataProfile} setIsScrolling={setIsScrolling} isScrolling={isScrolling} />
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
  },
  header: {
    alignContent: 'flex-start',
  },
})