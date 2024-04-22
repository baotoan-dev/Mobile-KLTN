import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AllPostNewest() {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
                }}>
                    Việc làm tốt nhất
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: 'white',
    }
})