import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';

export default function AllCVFromProfile({
    setIsCheckAllCV,
    isCheckAllCV
}) {
    return (
        <View style={[styles.container, {
            marginTop: 20,
        }]}>
            <View style={styles.flexItem}>
                <RadioButton
                    value="first"
                    status={isCheckAllCV ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsCheckAllCV(!isCheckAllCV)
                    }}
                />
                <Text>
                    CV từ thư viện của tôi
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
        borderRadius: 10,
        paddingVertical: 10,
    },
    flexItem: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})