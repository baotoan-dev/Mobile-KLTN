import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingProfile() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cài đặt tài khoản</Text>
            <View>
                <TouchableOpacity style={styles.item}>
                    <Text>Thông tin cá nhân</Text>
                    <MaterialIcons name="navigate-next" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text>Vô hiệu hóa tài khoản</Text>
                    <MaterialIcons name="navigate-next" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        borderBottomColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})