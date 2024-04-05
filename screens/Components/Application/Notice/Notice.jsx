import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Notice() {
    return (
        <View>
            <Text style={styles.title}>Lưu ý</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
})