import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCvExtraInformationAction, getCvExtraInformationAction } from '../../../../redux/store/CvExtraInformation/CvExtraInformationSlice';
import { createCvListExtraInformaion } from './helpers/CreateCvListExtraInformation';
import { CreateCvExtraInformation, CreateMoreCvExtraInformation } from './helpers/CreateCvExtraInformation';
import { TYPE_EDUCATION } from '../constant/constantContentCv';
import HeaderOfScreen from '../../../Components/HeaderOfScreen/HeaderOfScreen';
import { getProfileAction } from '../../../../redux/store/Profile/profileSilce';

export default function Education(prop) {
    const { typeAction } = prop.route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const cvExtraInformation = useSelector(state => state.cvExtraInformation.cvExtraInformation);
    const [listExtraInformation, setListExtraInformation] = useState([]);
    const [listOtherInformation, setListOtherInformation] = useState([]);
    const [cvIndex, setCvIndex] = useState(0);

    useEffect(() => {
        dispatch(getProfileAction('vi'))
    }, [])

    useEffect(() => {
        if (profile) {
            // get item have cvIndex highest
            if (typeAction === 'create') {
                let maxIndex = 0;
                profile.profilesCvs.forEach((item, index) => {
                    if (item.cvIndex > maxIndex) {
                        maxIndex = item.cvIndex
                    }
                })
                setCvIndex(maxIndex)
            }
            else {

            }
        }
    }, [typeAction, profile])

    useEffect(() => {
        dispatch(getCvExtraInformationAction(cvIndex))
    }, [typeAction, profile])

    useEffect(() => {
        if (cvExtraInformation) {
            const data = createCvListExtraInformaion(cvExtraInformation);

            const newData = data && data.filter(item => item.type === TYPE_EDUCATION);

            const otherData = data && data.filter(item => item.type !== TYPE_EDUCATION);

            setListOtherInformation(otherData);

            setListExtraInformation(newData ? newData[0] : {});
        }
    }, [cvExtraInformation])

    const handleDeleteExtraInformation = async (id) => {
        let arrayMore = []

        const newListExtraInformation = listExtraInformation && listExtraInformation.moreCvExtraInformations.filter(item => +item.id !== +id);

        newListExtraInformation.map((item, index) => {
            const createMoreCvExtraInformationData = CreateMoreCvExtraInformation(item.position, item.time, item.company, item.description, item.index, item.padIndex);
            arrayMore.push(createMoreCvExtraInformationData);
        });

        const newCreateCvExtraInformation = CreateCvExtraInformation(listExtraInformation.type, listExtraInformation.row, listExtraInformation.col, listExtraInformation.cvIndex, listExtraInformation.part, arrayMore, listExtraInformation.padIndex);

        listOtherInformation.push(newCreateCvExtraInformation);

        if (newCreateCvExtraInformation) {
            dispatch(createCvExtraInformationAction(listOtherInformation)).then(() => {
                dispatch(getCvExtraInformationAction(cvIndex));
            });
        }
    };

    return (
        <View style={styles.container}>
            <HeaderOfScreen title="Học vấn" />
            <ScrollView>
                {
                    listExtraInformation && listExtraInformation.moreCvExtraInformations &&
                    listExtraInformation.moreCvExtraInformations.map((item, index) => {
                        return (
                            <View style={styles.item} key={index}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('UpdateEducation', {
                                                idParent: index,
                                                typeParent: item.type,
                                                positionParent: item.position,
                                                companyParent: item.company,
                                                descriptionParent: item.description,
                                                timeParent: item.time,
                                                cvIndexParent: cvIndex,
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
                                            {`Tên vị trí: ${item.position}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                                marginTop: 5,
                                                textTransform: 'uppercase'
                                            }}>
                                            {`Công ty: ${item.company}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                                marginTop: 2,
                                                color: 'gray',
                                                numberOfLines: 1
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
                        navigation.navigate('AddEducation', {
                            cvIndexParent: cvIndex ? cvIndex : 0,
                        })
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
    item: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        margin: 10,
        borderColor: '#97E7E1',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})