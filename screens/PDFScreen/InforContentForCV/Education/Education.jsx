import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCvExtraInformationAction, deleteCvExtraInformationAction, getCvExtraInformationAction } from '../../../../redux/store/CvExtraInformation/CvExtraInformationSlice';
import { createCvListExtraInformaion } from './helpers/CreateCvListExtraInformation';
import { CreateMoreCvExtraInformation } from './helpers/CreateCvExtraInformation';

export default function Education() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cvExtraInformation = useSelector(state => state.cvExtraInformation.cvExtraInformation);
    const [listExtraInformation, setListExtraInformation] = useState([]);

    useEffect(() => {
        dispatch(getCvExtraInformationAction(0))
    }, [])

    useEffect(() => {
        const data = createCvListExtraInformaion(cvExtraInformation);

        setListExtraInformation(data);

    }, [cvExtraInformation])

    const handleDeleteExtraInformation = async (id) => {
        const newListExtraInformation = listExtraInformation.filter(item => +item.id !== +id);

        const newCvExtraInformationData = newListExtraInformation.map((item, index) => {
            const createMoreCvExtraInformationData = CreateMoreCvExtraInformation(item.position, item.time, item.company, item.description, index);
            return CreateMoreCvExtraInformation(item.type, 0, 0, 0, 0, createMoreCvExtraInformationData);
        });

        if (newListExtraInformation && newListExtraInformation.length > 0) {
            dispatch(createCvExtraInformationAction(newCvExtraInformationData)).then(() => {
                dispatch(getCvExtraInformationAction(0));
            });
        }
        if (newListExtraInformation && newListExtraInformation.length === 0) {
            dispatch(deleteCvExtraInformationAction(0)).then(() => {
                dispatch(getCvExtraInformationAction(0));
            })
        }
    };

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
                }}>Học vấn</Text>
            </View>
            <ScrollView>
                {
                    listExtraInformation && listExtraInformation.length > 0 && listExtraInformation.map((item, index) => {
                        return (
                            <View style={styles.item} key={index}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('UpdateEducation')
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
                                            {`Tên vị trí: ${item.position}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 14,
                                                marginTop: 5,
                                            }}>
                                            {`Công ty: ${item.company}`}
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
                                <TouchableOpacity onPress={() => {
                                    handleDeleteExtraInformation(item.id)
                                }}>
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
                        navigation.navigate('AddEducation')
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