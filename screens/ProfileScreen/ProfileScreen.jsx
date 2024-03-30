import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Color } from '../../utils/Color';
import { Button } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../App';
import * as SecureStore from 'expo-secure-store';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const { auth, setAuth } = useContext(AuthContext);
  const { profile, loading, error } = useSelector(state => state.profile);

  AsyncStorage.getItem('token').then(token => {
    setToken(token);
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <View>
            <Image source={{ uri: profile.avatarPath }} style={{ width: 60, height: 60, borderRadius: 50 }} />
          </View>
          <View style={{
            marginLeft: 10,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: Color.primary,
              fontStyle: 'italic',
            }}>Welcome</Text>
            <Text>{profile.name}</Text>
          </View>
        </View>
        <Button type='solid' radius="xl" color="secondary" onPress={handleLogout}>
          <MaterialIcons name="logout" size={22} color="white" style={{
            marginLeft: 4,
          }} />
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
  },
})