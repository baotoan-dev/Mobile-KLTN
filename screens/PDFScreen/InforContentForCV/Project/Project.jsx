import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createCvProjectAction, getCvProjectAction } from '../../../../redux/store/CvProject/cvProjectSlice';
import { createCvListProject } from './helpers/CreateCvListProject';
import { createCvProject, createMoreCvProject } from './helpers/CreateCvProject';
import HeaderOfScreen from '../../../Components/HeaderOfScreen/HeaderOfScreen';

export default function Project() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [listProject, setListProject] = useState([])
    const cvProject = useSelector(state => state.cvProject.cvProject);

    useEffect(() => {
        dispatch(getCvProjectAction(0))
    }, [])

    useEffect(() => {
        if (cvProject) {
            const data = createCvListProject(cvProject);
            setListProject(data[0]);
        }
    }, [cvProject]);

    const handleDeleteProject = async (id) => {
        let arrayMore = []

        const newListProject = listProject && listProject.moreCvProjects.filter(item => +item.id !== +id);

        newListProject.map((item, index) => {
            const createMoreCvProjectData = createMoreCvProject(item.time, item.link, item.participant, item.position, item.functionality, item.technology, item.index, item.padIndex, item.name);
            arrayMore.push(createMoreCvProjectData);
        });

        const newCreateProject = createCvProject(listProject.type, listProject.row, listProject.col, listProject.cvIndex, listProject.part, arrayMore, listProject.padIndex);

        if (newCreateProject) {
            dispatch(createCvProjectAction([newCreateProject])).then(() => {
                dispatch(getCvProjectAction(0));
            });
        }
    };


    return (
        <View style={styles.container}>
            <HeaderOfScreen title="Dự án" />
            <ScrollView>
                {
                    listProject && listProject.moreCvProjects &&
                    listProject.moreCvProjects.map((item, index) => {
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
                                                nameParent: item.name,
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
                                            {`Tên dự án: ${item.name}`}
                                        </Text>
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                fontSize: 12,
                                            }}>
                                            {`Vị trí: ${item.position}`}
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})