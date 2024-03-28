import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function DescriptionComponent({post}) {
  return (
    <View style={styles.container}>
      <Text style={{
        marginTop: 30,
        marginBottom: 10,
        fontSize: 15,
      }}>{post.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})