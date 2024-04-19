import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCvExtraInformationAction, deleteCvExtraInformationAction, getCvExtraInformationAction } from '../../../../redux/store/CvExtraInformation/CvExtraInformationSlice';
import { createCvListExtraInformaion } from './helpers/CreateCvListExtraInformation';
import { CreateCvExtraInformation, CreateMoreCvExtraInformation } from './helpers/CreateCvExtraInformation';
import { TYPE_CETIFICATION } from '../Constant/constantContentCv';

export default function Certification() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [listCertification, setListCertification] = useState([]);
    const [listOtherInformation, setListOtherInformation] = useState([]);
    const cvExtraInformation = useSelector(state => state.cvExtraInformation.cvExtraInformation);


    useEffect(() => {
        dispatch(getCvExtraInformationAction(0))
    }, [])

    useEffect(() => {
        if (cvExtraInformation) {
            const data = createCvListExtraInformaion(cvExtraInformation);

            const newData = data && data.filter(item => item.type === TYPE_CETIFICATION);

            const otherData = data && data.filter(item => item.type !== TYPE_CETIFICATION);

            setListOtherInformation(otherData);

            setListCertification(newData[0]);
        }
    }, [cvExtraInformation])


    const handleDeleteExtraInformation = async (id) => {
        let arrayMore = []

        const newListExtraInformation = listCertification && listCertification.moreCvExtraInformations.filter(item => +item.id !== +id);

        newListExtraInformation.map((item, index) => {
            const createMoreCvExtraInformationData = CreateMoreCvExtraInformation(item.position, item.time, item.company, item.description, item.index);
            arrayMore.push(createMoreCvExtraInformationData);
        });

        const newCreateCvExtraInformation = CreateCvExtraInformation(listCertification.type, listCertification.row, listCertification.col, listCertification.cvIndex, listCertification.part, arrayMore);

        listOtherInformation.push(newCreateCvExtraInformation);

        if (newCreateCvExtraInformation) {
            dispatch(createCvExtraInformationAction(listOtherInformation)).then(() => {
                dispatch(getCvExtraInformationAction(0));
            });
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
                }}>Chứng chỉ</Text>
            </View>
            <ScrollView>
                {
                    listCertification && listCertification.moreCvExtraInformations &&
                    listCertification.moreCvExtraInformations.map((item, index) => {
                        return (
                            <View style={styles.item} key={index}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('UpdateCertification', {
                                                idParent: index,
                                                typeParent: item.type,
                                                positionParent: item.position,
                                                companyParent: item.company,
                                                descriptionParent: item.description,
                                                timeParent: item.time,
                                            })
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
                                <TouchableOpacity
                                    onPress={() => {
                                        handleDeleteExtraInformation(item.id);
                                    }}
                                >
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