import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ContentHeaderPDFScreen() {

    return (
        <View style={styles.container}>
            <View>
                <Text style={{
                    fontWeight: 'bold',
                }}>
                    Màu sắc
                </Text>
            </View>
            <TouchableOpacity>
                <Text style={{
                    color: 'blue',
                    fontWeight: 'bold',
                }}>
                    Đổi mẫu
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    }
})