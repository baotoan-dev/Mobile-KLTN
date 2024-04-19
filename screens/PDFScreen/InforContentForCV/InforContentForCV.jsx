import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { ContentEditForCv } from './constant/constant'
import { useNavigation } from '@react-navigation/native';
import HeaderOfScreen from '../../Components/HeaderOfScreen/HeaderOfScreen';

export default function InforContentForCV() {
    const navigation = useNavigation()
    return (
        <View>
            <HeaderOfScreen title='Thông tin cơ bản' />
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
        borderWidth: 0.5,
        borderRadius: 5,
        margin: 10,
        width: '44%',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#97E7E1',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 10,
        paddingBottom: 10,
    }
})