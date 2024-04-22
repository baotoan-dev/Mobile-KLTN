import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

export default function LoaderComponent({
    isOver
}) {
    return (
        isOver ? (
            <View>
                <Text></Text>
            </View>
        ) : (
            <View>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    );
}