import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import HeaderOfScreen from '../../HeaderOfScreen/HeaderOfScreen';

export default function MoreInforOfTopCompany() {
    const navigation = useNavigation();
    return (
        <View style={
            styles.container
        }>
            <HeaderOfScreen title='Thông tin Top Công ty hàng đầu' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})