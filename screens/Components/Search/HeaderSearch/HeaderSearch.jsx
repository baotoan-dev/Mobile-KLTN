import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import PopularKeyowrd from '../PopularKeyowrd/PopularKeyowrd';

export default function HeaderSearch() {
    const navitation = useNavigation();
    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </View>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => {
                        navitation.navigate('Search');
                    }} >
                        <View>
                            <EvilIcons name="search" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        placeholder="Nhập từ khóa tìm kiếm..."
                    />
                </View>
            </View>

            <PopularKeyowrd />
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 10,
        marginTop: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginLeft: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    }
})
