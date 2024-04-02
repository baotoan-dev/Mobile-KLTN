import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Logout() {
    
    const handleLogout = () => {
        SecureStore.deleteItemAsync('token');
        SecureStore.deleteItemAsync('refreshToken');
        setAuth(false);
        setToken('');
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity><Text style={styles.button}>Logout</Text></TouchableOpacity>
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
        backgroundColor: '#E88686',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    }
})