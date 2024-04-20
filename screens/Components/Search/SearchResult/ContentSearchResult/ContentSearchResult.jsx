import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSearchAction } from '../../../../../redux/store/Search/searchSlice';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { bookmarksApi } from '../../../../../api/bookmarks/bookmarksApi';
import { getProfileAnalyticsAction } from '../../../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice';
import { Ionicons } from '@expo/vector-icons';

export default function ContentSearchResult(prop) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [accountId, setAccountId] = useState('');
    const search = useSelector(state => state.search.search);
    const [listFilterJob, setListFilterJob] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [q, setQ] = React.useState('');
    const [categoryId, setCategoryId] = React.useState(null);
    const [locationId, setLocationId] = React.useState(null);
    const [jobTypeId, setJobTypeId] = React.useState([]);
    const [salaryMin, setSalaryMin] = React.useState(null);
    const [salaryMax, setSalaryMax] = React.useState(null);
    const [isOver, setIsOver] = React.useState(false);
    const [total, setTotal] = React.useState(0);

    useEffect(() => {
        const getAccountId = async () => {
            const accountId = await SecureStore.getItemAsync('accountId');
            setAccountId(accountId)
        }
        getAccountId();
    }, [])

    useEffect(async () => {
        await AsyncStorage.getItem('keyword').then((data) => {
            setQ(data);
        });
        await AsyncStorage.getItem('dataCategoryFilter').then((data) => {
            data = JSON.parse(data);
            setCategoryId(data.map((item) => item.id));
        });
        await AsyncStorage.getItem('dataLocationFilter').then((data) => {
            data = JSON.parse(data);
            setLocationId(data.map((item) => item.id));
        });
        await AsyncStorage.getItem('dataJobTypeFilter').then((data) => {
            data = JSON.parse(data);
            setJobTypeId(data.map((item) => item.id));
        });
        await AsyncStorage.getItem('dataMoneyFilter').then((data) => {
            data = JSON.parse(data);
            setSalaryMin(data.salaryMin);
            setSalaryMax(data.salaryMax);
        })
    }, []);

    useEffect(() => {
        if (search) {
            setListFilterJob(search.posts);
            setIsOver(search.is_over);
            setTotal(search.total);
        }
    }, [search]);

    const loadMoreItem = () => {
        if (!isOver) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    useEffect(() => {
        dispatch(getSearchAction(
            q,
            currentPage,
            null,
            null,
            null,
            null,
            salaryMin,
            salaryMax,
            null,
            null,
            jobTypeId,
            categoryId,
            locationId,
            null,
            'vi',
        )).then(
            () => {
                if (currentPage === 0) {
                    setListFilterJob(search.posts)
                }
                else {
                    setListFilterJob([...listFilterJob, ...search.posts])
                }
            }
        );
    }, [currentPage])


    const handleCreateBookmark = async (postId) => {
        try {
            const res = await bookmarksApi.createBookMark(postId);

            if (res && res.data && res.data.code === 200) {
                const newListJob = listFilterJob.map((item) => {
                    if (item.id === postId) {
                        return {
                            ...item,
                            bookmarked: true
                        }
                    }
                    return item
                })
                setListFilterJob(newListJob);
                dispatch(getProfileAnalyticsAction())
            }
        } catch (error) {
            console.error("Error in handleCreateBookmark:", error);
        }
    };


    const handleDeleteBookmark = async (postId) => {
        try {
            const res = await bookmarksApi.deleteBookMark(postId);

            if (res && res.data && res.data.code === 200) {
                const newListJob = listFilterJob.map((item) => {
                    if (item.id === postId) {
                        return {
                            ...item,
                            bookmarked: false
                        }
                    }
                    return item
                })
                setListFilterJob(newListJob);
                dispatch(getProfileAnalyticsAction())
            }
        } catch (error) {
            console.error("Error in handleDeleteBookmark:", error);
        }
    }

    return (
        <View>
            {
                total > 0 && (
                    <Text style={{
                        padding: 10,
                        fontWeight: 'bold'
                    }}>
                        Tìm thấy {total} công việc
                    </Text>
                )
            }
            <FlatList
                data={listFilterJob}
                horizontal={false}
                onEndReached={loadMoreItem}
                onEndReachedThreshold={1}
                ListFooterComponent={() => (
                    <View style={{
                        height: 100,
                    }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>

                )}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('PostDetail', {
                                id: item.id
                            })
                        }}
                        style={{
                            padding: 10,
                            borderBottomColor: '#d3d3d3',
                            borderBottomWidth: 0.7,
                        }}>
                        <View style={styles.item}>
                            <View style={styles.left}>
                                <Image source={{ uri: item.image }} style={styles.logo} />
                            </View>
                            <View style={styles.center}>
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        fontWeight: 'bold',
                                    }}>
                                    {item.title}
                                </Text>
                                <Text
                                    numberOfLines={1}
                                >
                                    {item.company_name}
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        borderWidth: 0.1,
                                        borderRadius: 2,
                                        padding: 3,
                                        backgroundColor: '#DFF5FF',
                                    }}>
                                        {item.district_name}
                                    </Text>
                                    <Text style={{
                                        marginLeft: 10,
                                        fontSize: 12,
                                        borderWidth: 0.1,
                                        borderRadius: 2,
                                        padding: 3,
                                        backgroundColor: '#DFF5FF',
                                    }}>
                                        {item.job_type.job_type_name}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.right}>
                                {
                                    item.accountId !== accountId && (
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (item.bookmarked) {
                                                    handleDeleteBookmark(item.id)
                                                    return
                                                }
                                                else {
                                                    handleCreateBookmark(item.id)
                                                    return
                                                }
                                            }}
                                        >
                                            {item.bookmarked === true ? <Ionicons name="bookmark" size={24} color="black" /> : <Feather name="bookmark" size={24} color="black" />}
                                        </TouchableOpacity>
                                    )
                                }

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#97E7E1',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    left: {
        width: '25%',
        height: 100,
        padding: 10,
    },
    center: {
        width: '65%',
        height: 100,
        marginTop: 10,
    },
    right: {
        width: '10%',
        height: 100,
        marginTop: 10
    },
    logo: {
        width: '80%',
        height: '100%',
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
})