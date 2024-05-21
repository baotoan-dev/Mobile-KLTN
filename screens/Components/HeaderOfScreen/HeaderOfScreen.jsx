import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

export default function HeaderOfScreen({ title }) {
    const navigation = useNavigation()
    return (
        <Animated.View style={styles.container}>
            <Animated.View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="#242670" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        zIndex: 100,
        elevation: 100,
        shadowColor: 'black',
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#242670',
    }
})

