import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function SeenCVApplied(prop) {
    const { cv } = prop.route.params
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View
                style={styles.header}
            >
                {/* icon back */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Xem CV</Text>
            </View>
            {
                cv && (
                    <View style={styles.a4Paper}>
                        <WebView
                            source={{ uri: `https://docs.google.com/viewer?url=${cv}&embedded=true` }}
                            style={styles.pdf}
                        />
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: 30,
        borderBottomWidth: 0.5,
        height: 70,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 5
    },
    a4Paper: {
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})