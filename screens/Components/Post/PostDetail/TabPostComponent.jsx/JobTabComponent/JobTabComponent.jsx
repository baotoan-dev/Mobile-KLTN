import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function JobTabComponent({post}) {
  return (
    <View style={styles.container}>
      <Text>JobTabComponent</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})