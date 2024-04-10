import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { CreateCvExtraInformation, CreateMoreCvExtraInformation } from '../helpers/CreateCvExtraInformation';
import { createCvExtraInformationAction, getCvExtraInformationAction } from '../../../../../redux/store/CvExtraInformation/CvExtraInformationSlice';
import { createCvListExtraInformaion } from '../helpers/CreateCvListExtraInformation';
import { useDispatch, useSelector } from 'react-redux';

export default function AddEducation() {
    const navigation = useNavigation();
    const [listExtraInformation, setListExtraInformation] = useState([]);
    const dispatch = useDispatch();
    const cvExtraInformation = useSelector(state => state.cvExtraInformation.cvExtraInformation);
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (cvExtraInformation) {
            const data = createCvListExtraInformaion(cvExtraInformation);

            setListExtraInformation(data);
        }
        else {
            setListExtraInformation([]);
        }
    }, [cvExtraInformation])


    const handleSaveExtraInformation = async () => {
        const newListExtraInformation = [...listExtraInformation, {
            id: listExtraInformation.length + 1,
            type: 'education',
            position: position,
            time: `${startTime} - ${endTime}`,
            company: company,
            description: description,
        }];

        const newCvExtraInformationData = newListExtraInformation.map((item, index) => {
            const createMoreCvExtraInformationData = CreateMoreCvExtraInformation(item.position, item.time, item.company, item.description, index);
            return CreateCvExtraInformation(item.type, 0, 0, 0, 0, createMoreCvExtraInformationData);
        });

        if (newListExtraInformation && newListExtraInformation.length > 0) {
            dispatch(createCvExtraInformationAction(newCvExtraInformationData)).then(() => {
                dispatch(getCvExtraInformationAction(0));
            });
        }

        navigation.goBack();
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
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginLeft: 5,
                    }}>Thêm học vấn
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        handleSaveExtraInformation();
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
                        }}>Trường học</Text>
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
                            placeholder="Trường học"
                            onChangeText={(text) => {
                                setCompany(text)
                            }}
                        >
                        </TextInput>
                    </View>
                </View>
                {/* position */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>Chuyên ngành</Text>
                        <FontAwesome name="asterisk" size={10} color="red" style={{
                            marginLeft: 5,
                        }} />
                    </View>
                    <View style={styles.input}>
                        <AntDesign name="creditcard" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Chuyên ngành"
                            onChangeText={(text) => {
                                setPosition(text)
                            }}
                        >
                        </TextInput>
                    </View>
                </View>
                {/* Start time */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>Thời gian bắt đầu</Text>
                    </View>
                    <View style={styles.input}>
                        <Entypo name="back-in-time" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Thời gian bắt đầu"
                            onChangeText={(text) => {
                                setStartTime(text)
                            }}
                        >
                        </TextInput>
                    </View>
                </View>
                {/* End time */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>Thời gian kết thúc</Text>
                    </View>
                    <View style={styles.input}>
                        <Entypo name="back-in-time" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Thời gian kết thúc"
                            onChangeText={(text) => {
                                setEndTime(text)
                            }}
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