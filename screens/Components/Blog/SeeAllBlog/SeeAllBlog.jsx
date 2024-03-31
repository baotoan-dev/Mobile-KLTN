import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SeeAllBlog() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 10,
                        marginLeft: 10,
                    }}>Tất cả bài viết</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    }
})