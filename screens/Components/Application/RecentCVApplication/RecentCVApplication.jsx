import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';

export default function RecentCVApplication({
    setIsCheckRecentCV,
    isCheckRecentCV,
    profile
}) {
    return (
        <View style={styles.container}>
            <View style={styles.flexItem}>
                <RadioButton
                    value="first"
                    status={isCheckRecentCV ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsCheckRecentCV(!isCheckRecentCV)
                    }}
                />
                <Text>
                    CV ứng tuyển gần nhất
                </Text>
            </View>
            {
                isCheckRecentCV && (
                    <Text>
                        123
                    </Text>
                )
            }
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