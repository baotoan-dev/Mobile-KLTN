import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'

export default function HeadingBlog() {
    return (
        <View style={styles.contaier}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                }}>Cùng chia sẻ - vươn xa</Text>
                <View>
                    <FontAwesome name="paper-plane" size={24} color="black" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contaier: {
        backgroundColor: '#F0EBE3',
        padding: 10,
        marginBottom: 10,
    }
})
