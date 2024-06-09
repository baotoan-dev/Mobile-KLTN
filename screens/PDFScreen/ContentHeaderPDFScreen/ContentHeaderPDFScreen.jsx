import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ContentHeaderPDFScreen() {
    const colors = [
        '#529300',
        '#3B82F6'
    ]

    return (
        <View style={styles.container}>
            <View>
                <Text style={{
                    fontWeight: 'bold',
                    color: '#242670',
                    fontSize: 16,
                }}>
                    Màu sắc
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
            }}>
                {
                    colors.map((color, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: 25,
                                    height: 25,
                                    borderRadius: 15,
                                    backgroundColor: color,
                                    marginRight: 10
                                }}
                            >
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
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