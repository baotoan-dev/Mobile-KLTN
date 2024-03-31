import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function HeadingSeeMore({ left, right, handleSeeMore }) {
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    marginBottom: 10
                }}>{left}</Text>
                <TouchableOpacity
                    onPress={() => {
                        handleSeeMore()
                    }}
                >
                    <Text style={{
                    fontSize: 13,
                    marginBottom: 10,
                    color: 'blue',
                }}>{right}</Text></TouchableOpacity>
            </View>
        </View>
    )
}