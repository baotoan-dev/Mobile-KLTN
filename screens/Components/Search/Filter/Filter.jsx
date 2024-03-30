import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Filter() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        marginRight: 10,
                    }}>
                    <MaterialIcons name="cancel" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                }}>
                    Bộ lọc
                </Text>
            </View>
            <TouchableOpacity style={styles.content}>
                <View style={styles.twoFlex}>
                    <View>
                        <Entypo name="address" size={24} color="black" />
                    </View>
                    <View style={{
                        marginLeft: 10
                    }}>
                        <Text>
                            Khu vực
                        </Text>
                    </View>
                </View>
                <View>
                    <AntDesign name="right" size={24} color="gray" />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 20,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        borderBottomWidth: 0.2,
        paddingVertical: 15,
        borderBottomColor: 'gray',
    },
    twoFlex: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})