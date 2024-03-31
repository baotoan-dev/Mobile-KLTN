import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Color } from '../../../utils/Color';

export default function Heading({ props }) {
    const { title, extra } = props;
    return (
        <View style={styles.container}>
            <Text style={styles.left}>{title}</Text>
            <Text style={styles.right}>{extra}</Text>
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
        color: Color.primary
    },
    right: {
        color: 'blue', 
        fontSize: 14
    }
})