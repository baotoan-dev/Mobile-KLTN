import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
export default function HeadingContentProfile({ left, right, handleOpenModal }) {
    return (
        <View style={styles.container}>
            <Text style={styles.left}>
                {left}
            </Text>
            <TouchableOpacity onPress={() => {
                handleOpenModal();
            }}>
                <Text style={styles.right}>
                    {right}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 40,
        alignItems: 'center',
    },
    left: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#242670',
    },
    right: {
        fontSize: 15,
        color: '#242670',
        fontWeight: 'bold',
    }
})