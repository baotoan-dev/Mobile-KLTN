import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import Heading from '../Heading/Heading'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { useEffect } from 'react'
import jobApi from '../../../api/job/jobApi'
import { Color } from '../../../utils/Color'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SCREEN_WIDTH = Dimensions.get("screen").width - 45;

export default function NewJob() {
    const [newJob, setNewJob] = useState([]);
    const [thresholdNewJob, setThresholdNewJob] = useState(0);
    const navigation = useNavigation();

    const getNewJob = async () => {

        const response = await jobApi.getPostNewest(
            null,
            null,
            null,
            null,
            12,
            thresholdNewJob,
            "vi"
        );

        if (response && response.data.status === 200) {
            setNewJob(response.data.data);
        }
    }

    useEffect(() => {
        getNewJob();
    }, [])


    return (
        <View style={styles.container}>
            <Heading props={{ title: 'Công việc mới nhất', extra: 'Xem thêm' }} />
            <FlatList
                style={{ marginTop: 10 }}
                data={newJob}
                horizontal={true}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('PostDetail', { id: item.id });
                    }}>
                        <View style={styles.item}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: item.image }} style={styles.image} />
                                </View>
                                <View style={styles.contentContainer}>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            color: Color.primary,
                                            width: 150,
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >{(item.title)}</Text>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 10,
                                            color: 'gray',
                                        }}>
                                        {item.companyName}
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        gap: 10, 
                                        alignItems: 'center',
                                        marginTop: 5,
                                        flexWrap: 'wrap',
                                    }}>
                                        <Text style={styles.extraInfor}>
                                            {item.location.district.fullName}
                                        </Text>
                                        <Text style={styles.extraInfor}>
                                            {item.jobType.name}
                                        </Text>
                                    </View>
                                    <Text
                                        style={styles.textSalary}
                                        numberOfLines={1}
                                    >
                                        {item.salaryMin + ' - ' + item.salaryMax + ' ' + item.moneyType}
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Feather name="bookmark" size={24} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    item: {
        borderWidth: 0.2,
        borderColor: 'gray',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        borderRadius: 5,
        margin: 5,
        width: SCREEN_WIDTH,
        justifyContent: 'space-between',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    imageContainer: {
        marginRight: 10,
    },
    contentContainer: {
        flexDirection: 'column',
        gap: 1,
    },
    extraInfor: {
        fontSize: 10,
        color: 'gray',
        borderWidth: 0.1,
        padding: 3,
        borderRadius: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fontWeight: 'bold',
        marginRight: 10,
    },
    textSalary: {
        fontSize: 10,
        color: 'gray',
        marginTop: 5,
        borderWidth: 0.2,
        padding: 3,
        // blue
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        borderRadius: 2,
        width: 60,
        borderBlockColor: 'gray',
    }
})