import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ListUserChat from './ListUserChat/ListUserChat';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={
        styles.header
      }>
        Tin nhắn
      </Text>
      <ListUserChat />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    padding: 10,
    backgroundColor: 'white',
  }
});
