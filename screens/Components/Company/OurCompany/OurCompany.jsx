import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function OurCompany({ company}) {
  return (
    <View style={styles.container}>
      <Text style={{
        marginTop: 10,
        fontSize: 20,
        color: 'gray',
      }}>Our Company</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})