import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function CompanyTabComponent({post}) {
  return (
    <View style={styles.container}>
      <Text>CompanyTabComponent</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})