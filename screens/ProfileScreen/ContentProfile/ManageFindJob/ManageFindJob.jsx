import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAnalyticsAction } from '../../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice';

export default function ManageFindJob() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const profileAnalytic = useSelector(state => state.profileAnalytic.profileAnalytic);
    const [listProfileAnalytic, setListProfileAnalytic] = React.useState([]);

    useEffect(() => {
        dispatch(getProfileAnalyticsAction());
    }, [])

    useEffect(() => {
        if (profileAnalytic) {
            setListProfileAnalytic(profileAnalytic);
        }
    }, [profileAnalytic])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quản lý tìm việc</Text>
            <View style={styles.wapper}>
                <TouchableOpacity
                    onPress={
                        () => navigation.navigate('ManageJobApplication')
                    }
                    style={styles.item}>
                    <View style={styles.icon}>
                        <FontAwesome name="shopping-bag" size={24} color="black" />
                    </View>
                    <View style={styles.content}>
                        <Text>
                            Đã ứng tuyển
                        </Text>
                        <Text style={styles.count}>
                            {listProfileAnalytic.totalApplication}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('Bookmark');
                }}
                style={[styles.item, {
                    marginLeft: '5%',
                }]}>
                    <View style={styles.icon}>
                        <Entypo name="save" size={24} color="black" />
                    </View>
                    <View style={styles.content}>
                        <Text>
                            Đã lưu
                        </Text>
                        <Text style={styles.count}>
                            {listProfileAnalytic.totalBookmark}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.item, {
                    marginTop: '5%',
                }]}>
                    <View style={styles.icon}>
                        <Ionicons name="duplicate" size={24} color="black" />
                    </View>
                    <View style={styles.content}>
                        <Text>
                            Phù hợp
                        </Text>
                        <Text style={styles.count}>
                            {listProfileAnalytic.totalPost}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CompanyFollowing');
                    }}
                    style={[styles.item, {
                        marginTop: '5%',
                        marginLeft: '5%',
                    }]}>
                    <View style={styles.icon}>
                        <Ionicons name="duplicate" size={24} color="black" />
                    </View>
                    <View
                        style={styles.content}>
                        <Text>
                            Công ty theo dõi
                        </Text>
                        <Text style={styles.count}>
                            {listProfileAnalytic.totalFollowCompany}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ViewProfile');
                    }}
                    style={[styles.item]}>
                    <View style={styles.icon}>
                        <Entypo name="eye" size={24} color="black" />
                    </View>
                    <View style={styles.content}>
                        <Text>
                            NTD xem hồ sơ
                        </Text>
                        <Text style={styles.count}>
                            {listProfileAnalytic.totalViewProfile}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => {
                    navigation.navigate('NotifyJobProfile');
                }}
                style={[styles.item, {
                    marginLeft: '5%',
                }]}>
                    <View style={styles.icon}>
                        <Entypo name="bell" size={24} color="black" />
                    </View>
                    <View style={styles.content}>
                        <Text>
                            Thông báo việc làm
                        </Text>
                        <Text style={styles.count}>
                            {
                                listProfileAnalytic.totalKeywordNotification
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create(({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    wapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 0.1,
        borderRadius: 2,
        backgroundColor: '#D2D2D2',
        width: '47%',
        height: 100,
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    },
    count: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))