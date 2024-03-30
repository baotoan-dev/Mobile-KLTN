import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SearchResult() {
  const dispatch = useDispatch();
  const { search, loading, error } = useSelector(state => state.search);
  const [keyword, setKeyword] = useState('');
  const navigation = useNavigation();

  // useEffect(async () => {
  //   const nameKeyword = await AsyncStorage.getItem('keyword');
  //   if (nameKeyword) {
  //     setKeyword(nameKeyword);
  //   }
  // }, [])
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          paddingHorizontal: 20,
          marginBottom: 10,
        }}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(191, 201, 226)',
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Filter')}
          style={{
            borderWidth: 1,
            padding: 5,
            borderColor: 'gray',
            borderRadius: 20,
            marginRight: 10,
          }}>
          <AntDesign name="filter" size={24} color="black" />
        </TouchableOpacity>
        <View style={{
          borderRightWidth: 1,
          paddingRight: 10,
          borderColor: 'gray',
        }}>
          <Text>Lọc</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  }
})