import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { getAllKeywordNotificationAction } from '../../../../redux/store/KeywordNotificaiton/getAllKeywordNotification/getAllKeywordNotificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { keywordNotificationApi } from '../../../../api/keywordNotification/keywordNotificationApi';
import { getProfileAnalyticsAction } from '../../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice';

export default function ListKeywordNotificationComponent() {
    const dispatch = useDispatch();
    const allKeywordNotification = useSelector(state => state.allKeywordNotification.keywordNotification);
    const [data, setData] = React.useState([])

    useEffect(() => {
        dispatch(getAllKeywordNotificationAction());
    }, [])

    useEffect(() => {
        if (allKeywordNotification) {
            setData(allKeywordNotification.keywords)
        }
    }, [allKeywordNotification])

    const handleDeleteKeywordNotification = async (id) => {
        const res = await keywordNotificationApi.deleteKeyWordNotification(id);

        if (res && res.data && res.data.success === true) {
            dispatch(getAllKeywordNotificationAction());
            dispatch(getProfileAnalyticsAction())
        }
    }

    const handleUpdateStatusKeywordNotification = async (id, status) => {
        const res = await keywordNotificationApi.updateStatusKeyWordNotification(id, status);

        if (res && res.data && res.data.success === true) {
            dispatch(getAllKeywordNotificationAction());
            dispatch(getProfileAnalyticsAction())
        }
    }

    return (
        <View>
            {
                data && data.length > 0 ? (
                    <>
                        <Text style={styles.itemCountText}>Tổng cộng: {data.length}</Text>
                        {data.map((item, index) => {
                            return (
                                <View
                                    style={styles.item}
                                    key={index}
                                >
                                    <View>
                                        <Text style={styles.name}>{item.keyword}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleUpdateStatusKeywordNotification(item.id, item.status ? 0 : 1);
                                            }}
                                        >
                                            {
                                                item.status === 1 ? (
                                                    <MaterialCommunityIcons name="bell-ring" size={24} color="black" />
                                                ) : (
                                                    <MaterialCommunityIcons name="bell-off" size={24} color="black" />
                                                )
                                            }
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                marginLeft: 10
                                            }}
                                            onPress={() => {
                                                handleDeleteKeywordNotification(item.id);
                                            }}
                                        >
                                            <MaterialCommunityIcons name="delete-circle" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            );
                        })}
                    </>
                ) : (
                    <View>
                        <Image
                            style={{
                                width: 150,
                                height: 150,
                                alignSelf: 'center',
                                marginTop: 100
                            }}
                            source={require('../../../../assets/images/no-data.png')}
                        />
                        <Text style={styles.noDataText}>Không có dữ liệu</Text>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    item: {
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#242670',
        margin: 10,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    name: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
        fontSize: 16,
    },
    itemCountText: {
        textAlign: 'left',
        margin: 10,
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },
})