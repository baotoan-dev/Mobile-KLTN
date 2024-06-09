import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ContentBottomPDFScreen({
    typeAction,
    clickUpdateUI,
    setClickUpdateUI,
}) {
    const navigation = useNavigation()
    return (
        <View style={styles.bottom}>
            <TouchableOpacity
                onPress={() => {
                    setClickUpdateUI(!clickUpdateUI)
                }}
                style={styles.button}
            >
                <AntDesign name="rocket1" size={24} color="white" />
                <Text style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
                    color: 'white',
                }}>
                    Sửa giao diện
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {
                    marginLeft: 10,
                }]}
                onPress={() => {
                    navigation.navigate('InforContentForCV', {
                        typeAction: typeAction
                    })
                }}
            >
                <AntDesign name="edit" size={24} color="white" />
                <Text style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
                    color: 'white',
                }}>
                    Sửa nội dung
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bottom: {
        padding: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: 'gray',
        borderTopWidth: 0.2,
        backgroundColor: 'white',
    },
    button: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bacjgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        backgroundColor: '#789292'
    }
});
