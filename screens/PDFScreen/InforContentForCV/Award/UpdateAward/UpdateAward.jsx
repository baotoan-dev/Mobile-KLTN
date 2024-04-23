import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCvExtraInformationAction, getCvExtraInformationAction } from '../../../../../redux/store/CvExtraInformation/CvExtraInformationSlice';
import { createCvListExtraInformaion } from '../helpers/CreateCvListExtraInformation';
import { CreateCvExtraInformation } from '../helpers/CreateCvExtraInformation';
import { TYPE_AWARD } from '../../constant/constantContentCv';

export default function UpdateAward(prop) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cvExtraInformation = useSelector(state => state.cvExtraInformation.cvExtraInformation);
    const { idParent, typeParent, positionParent, timeParent, companyParent, descriptionParent } = prop.route.params;
    const [listExtraInformation, setListExtraInformation] = useState([]);
    const [listOtherInformation, setListOtherInformation] = useState([]);
    const [type, setType] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        dispatch(getCvExtraInformationAction(0));
        setType(typeParent);
        setCompany(companyParent);
        setPosition(positionParent);
        setStartTime(timeParent.split(' - ')[0]);
        setEndTime(timeParent.split(' - ')[1]);
        setDescription(descriptionParent)
    }, [])

    useEffect(() => {
        if (cvExtraInformation) {
            const data = createCvListExtraInformaion(cvExtraInformation);

            const newData = data && data.filter(item => item.type === TYPE_AWARD);

            const otherData = data && data.filter(item => item.type !== TYPE_AWARD);

            const newListCvExtraInformation = {
                type: newData[0].type,
                row: newData[0].row,
                part: newData[0].part,
                col: newData[0].col,
                cvIndex: newData[0].cvIndex,
                moreCvExtraInformations: newData[0].moreCvExtraInformations.filter(item => item.id !== idParent),
            }

            setListOtherInformation(otherData);

            setListExtraInformation(newListCvExtraInformation);
        }
    }, [cvExtraInformation])

    const handleUpdate = () => {
        const newListExtraInformation = {
            col: listExtraInformation.col,
            cvIndex: listExtraInformation.cvIndex,
            part: listExtraInformation.part,
            row: listExtraInformation.row,
            type: listExtraInformation.type,
            padIndex: listExtraInformation.padIndex,
            moreCvExtraInformations: [
                ...listExtraInformation.moreCvExtraInformations,
                {
                    position: position,
                    time: startTime,
                    company: company,
                    description: description,
                    index: 0,
                    padIndex: 0,
                }
            ]
        };

        const newDataCvExtraInformation = CreateCvExtraInformation(newListExtraInformation.type, newListExtraInformation.row, newListExtraInformation.col, newListExtraInformation.cvIndex, newListExtraInformation.part, newListExtraInformation.moreCvExtraInformations, newListExtraInformation.padIndex);

        listOtherInformation.push(newDataCvExtraInformation);

        dispatch(createCvExtraInformationAction(listOtherInformation)).then(() => {
            dispatch(getCvExtraInformationAction(0));
        });

        navigation.goBack();
    }

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
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginLeft: 5,
                    }}>Cập nhật giải thưởng
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        handleUpdate();
                    }}
                >
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        color: 'blue',
                    }}>
                        Lưu
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                {/* company */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>
                          Tên giải thưởng
                        </Text>
                        <FontAwesome name="asterisk" size={10} color="red" style={{
                            marginLeft: 5,
                        }} />
                    </View>
                    <View style={styles.input}>
                        <Ionicons name="school-outline" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Tên giải thưởng"
                            onChangeText={(text) => {
                                setCompany(text)
                            }}
                            value={company}
                        >
                        </TextInput>
                    </View>
                </View>
                {/* description */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>Mô tả</Text>
                    </View>
                    <View style={styles.input}>
                        <AntDesign name="folderopen" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Mô tả"
                            onChangeText={(text) => {
                                setDescription(text)
                            }}
                            value={description}
                        >
                        </TextInput>
                    </View>
                </View>
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
        justifyContent: 'space-between',
    },
    content: {
        padding: 10
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.2,
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
    }
})