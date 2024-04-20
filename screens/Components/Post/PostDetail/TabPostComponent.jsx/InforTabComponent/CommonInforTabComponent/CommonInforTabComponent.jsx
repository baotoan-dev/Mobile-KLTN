import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native'
import { convertTime } from '../../../../../../../utils/convertTime';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CommonInforTabComponent({ post }) {
    return (
        <>
            {post ? (
                <View style={styles.container}>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <AntDesign name="calculator" size={24} color="black" />
                        </View>
                        <View style={styles.mrLeft}>
                            <Text style={styles.title}>Loại công việc</Text>
                            <Text style={styles.content}>{post?.job_type?.job_type_name}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <Entypo name="back-in-time" size={24} color="black" />
                        </View>
                        <View style={styles.mrLeft}>
                            <Text style={styles.title}>Giờ làm việc</Text>
                            <Text style={styles.content}>{convertTime(post.start_time) + ' - ' + convertTime(post.end_time)}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <FontAwesome5 name="calendar-week" size={24} color="black" />   
                        </View>
                        <View style={styles.mrLeft}>
                            <Text style={styles.title}>Làm việc cuối tuần</Text>
                            <Text style={styles.content}>{post.is_working_weekend ? 'Làm việc cuối tuần' : 'Không làm việc cuối tuần'}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <Entypo name="back-in-time" size={24} color="black" />
                        </View>
                        <View style={styles.mrLeft}>
                            <Text style={styles.title}>Làm việc từ xa</Text>
                            <Text style={styles.content}>{post.is_remotely ? 'Làm việc từ xa' : 'Không làm việc từ xa'}</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.icon}>
                            <Entypo name="back-in-time" size={24} color="black" />
                        </View>
                        <View style={styles.mrLeft}>
                            <Text style={styles.title}>Ngành nghề</Text>
                            <Text style={styles.content}>{
                                post && post.categories && post?.categories.map((item, index) => {
                                // last element no ','
                                if (index === post?.categories.length - 1) {
                                    return item.child_category;
                                } else {
                                    return item.child_category + ', ';
                                }
                            })}</Text>
                        </View>
                    </View>
                </View>
            ) : (<></>)}
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    mrLeft: {
        marginLeft: 10,
    },
    container: {
        padding: 10,
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 17,
        backgroundColor: 'gray',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 12,
        color: 'gray',
    },
    content: {
        fontWeight: 'bold',
    }
})
