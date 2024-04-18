import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import HeaderSearch from './HeaderSearch/HeaderSearch'

export default function Search() {
  return (
    <View style={styles.container}>
      <HeaderSearch />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    height: '100%',
  }
})