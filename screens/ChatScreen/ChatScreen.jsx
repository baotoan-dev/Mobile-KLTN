import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={
        styles.header
      }>
        Tin nhắn
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    padding: 10,
    backgroundColor: 'white',
  }
});
