import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Certification() {
    const navigation = useNavigation();
    const [listCertification, setListCertification] = useState([]);

    useEffect(() => {
        setListCertification([
            {
                position: 'Trưởng phòng',
                time: '2018 - 2022',
                company: 'Công ty ABC',
                description: 'Mô tả công việc',
                index: 0,
            },
            {
                position: 'Trưởng phong',
                time: '2018 - 2022',
                company: 'Công ty ABC',
                description: 'Mô tả công việc',
                index: 1,
            },
        ]);
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 5,
                }}>Chứng chỉ</Text>
            </View>
            <ScrollView>
                {
                    listCertification && listCertification.length > 0 && listCertification.map((item, index) => {
                        return (
                            <View style={styles.item} key={index}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('UpdateCertification')
                                        }}
                                    >
                                        <Entypo name="dial-pad" size={24} color="black" />
                                    </TouchableOpacity>
                                    <View style={{
                                        marginLeft: 10
                                    }}>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: 16,
                                            }}>
                                            {`Tên chứng chỉ: ${item.position}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 14,
                                                marginTop: 5,
                                            }}>
                                            {`Tổ chức: ${item.company}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                                marginTop: 2,
                                                color: 'gray'
                                            }}>

                                            {`Mô tả: ${item.description}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                                marginTop: 2,
                                                color: 'gray'
                                            }}>
                                            {`Thời gian: ${item.time}`}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <MaterialCommunityIcons name="delete-empty-outline" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                    )
                }
            </ScrollView>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddCertification')
                    }}
                    style={{
                        margin: 20,
                        borderWidth: 0.2,
                        backgroundColor: 'blue',
                        alignItems: 'center',
                        padding: 10,
                        borderRadius: 5,
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        height: 70,
    },
    item: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 0.2,
        borderRadius: 5,
        margin: 10,
    }
})