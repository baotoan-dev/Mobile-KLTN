import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store';
import { useContext } from 'react';
import { AuthContext } from '../../../../App';

export default function Logout() {
    const { setAuth} = useContext(AuthContext);
    const handleLogout = () => {
        SecureStore.deleteItemAsync('token');
        SecureStore.deleteItemAsync('refreshToken');
        setAuth(false);
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={handleLogout}
            ><Text style={styles.button}>Logout</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    button: {
        padding: 10,
        backgroundColor: '#242670',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    }
})