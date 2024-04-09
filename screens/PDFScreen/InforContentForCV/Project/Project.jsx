import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCvProjectAction, deleteCvProjectAction, getCvProjectAction } from '../../../../redux/store/CvProject/cvProjectSlice';
import { createCvListProject } from '../Education/helpers/CreateCvListProject';
import { createCvProject, createMoreCvProject } from '../Education/helpers/CreateCvProject';

export default function Project() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [listProject, setListProject] = useState([])
    const cvProject = useSelector(state => state.cvProject.cvProject);

    useEffect(() => {
        dispatch(getCvProjectAction(0))
    }, [])

    useEffect(() => {
        const data = createCvListProject(cvProject);

        setListProject(data);

    }, [cvProject]);

    const handleDeleteProject = async (id) => {
        const newListProject = listProject.filter(item => +item.id !== +id);

        const newCvProjectData = newListProject.map((item, index) => {
            const createMoreCvProjectData = createMoreCvProject(item.time, item.link, item.participant, item.position, item.functionality, item.technology, index);
            return createCvProject(item.type, 0, 0, 0, 0, createMoreCvProjectData);
        });

        if (newListProject && newListProject.length > 0) {
            dispatch(createCvProjectAction(newCvProjectData)).then(() => {
                dispatch(getCvProjectAction(0));
            });
        }
        if (newListProject && newListProject.length === 0) {
            dispatch(deleteCvProjectAction(0)).then(() => {
                dispatch(getCvProjectAction(0));
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
                }}>Dự án</Text>
            </View>
            <ScrollView>
                {
                    listProject && listProject.length > 0 && listProject.map((item, index) => {
                        return (
                            <View style={styles.item} key={index}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('UpdateProject', {
                                                idParent: item.id,
                                                typeParent: item.type,
                                                timeParent: item.time,
                                                linkParent: item.link,
                                                participantParent: item.participant,
                                                positionParent: item.position,
                                                functionalityParent: item.functionality,
                                                technologyParent: item.technology,
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
                                            {`Tên dự án: ${item.type}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 14,
                                                marginTop: 5,
                                            }}>
                                            {'Vị trí: ' + item.position}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                                marginTop: 2,
                                                color: 'gray'
                                            }}>

                                            {`Link dự án: ${item.link}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                                marginTop: 2,
                                                color: 'gray'
                                            }}>
                                            {`Thành viên: ${item.participant}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                                marginTop: 2,
                                                color: 'gray'
                                            }}>
                                            {`Chức năng: ${item.functionality}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                                marginTop: 2,
                                                color: 'gray'
                                            }}>
                                            {`Công nghệ: ${item.technology}`}
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
                                        handleDeleteProject(item.id)
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
                        navigation.navigate('AddProject')
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