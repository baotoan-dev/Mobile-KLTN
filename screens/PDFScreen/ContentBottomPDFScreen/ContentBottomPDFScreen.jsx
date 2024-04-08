import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ContentBottomPDFScreen() {
    const navigation = useNavigation()
    return (
        <View style={styles.bottom}>
            <TouchableOpacity
                style={styles.button}
            >
                <AntDesign name="rocket1" size={24} color="black" />
                <Text style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
                }}>
                    Sửa giao diện
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {
                    marginLeft: 10,
                }]}
                onPress={() => {
                    navigation.navigate('InforContentForCV')
                }}
            >
                <AntDesign name="edit" size={24} color="black" />
                <Text style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
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
        bacjgroundColor: 'white',
    },
    button: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
    }
});
