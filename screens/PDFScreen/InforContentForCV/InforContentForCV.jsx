import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ContentEditForCv } from './constant/constant'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function InforContentForCV() {
    const navigation = useNavigation()
    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 18,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 0.5,
                    marginLeft: 5,
                }}>
                    Thông tin cơ bản
                </Text>
            </View>
            <View style={styles.container}>
                {
                    ContentEditForCv.map((item, index) => {
                        return (
                            <TouchableOpacity 
                            onPress={() => {
                                navigation.navigate(item.screen)
                            }}
                            style={styles.item} key={index}>
                                {
                                    item.icon
                                }
                                <Text style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold',
                                }}>{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 0.2,
        borderRadius: 5,
        margin: 10,
        width: '44%',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
    }
})