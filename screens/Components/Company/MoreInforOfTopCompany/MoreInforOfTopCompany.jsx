import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MoreInforOfTopCompany() {
    const navigation = useNavigation();
    return (
        <View style={
            styles.container
        }>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: 'bold',
                }}>
                    Thông tin Top Công ty hàng đầu
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    }
})