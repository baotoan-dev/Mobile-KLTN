import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Color } from '../../../utils/Color';

export default function Heading({ props }) {
    const { title, extra, handleSeeMore } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.left}>{title}</Text>
            <TouchableOpacity
                onPress={() => {
                    handleSeeMore();
                }}
            >
                <Text style={styles.right}>{extra}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#242670'
    },
    right: {
        color: '#242670',
        fontSize: 14
    }
})