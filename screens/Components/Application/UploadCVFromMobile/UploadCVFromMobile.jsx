import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';

export default function UploadCVFromMobile({
    setIsCheckUploadCV,
    isCheckUploadCV
}) {
    return (
        <View style={[styles.container, {
            marginTop: 20,
        }]}>
            <View style={styles.flexItem}>
                <RadioButton
                    value="first"
                    status={isCheckUploadCV ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsCheckUploadCV(!isCheckUploadCV)
                    }}
                />
                <Text>
                    Tải CV từ điện thoại
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        paddingVertical: 10,
    },
    flexItem: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})