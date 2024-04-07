import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSearchAction } from '../../../../../redux/store/Search/searchSlice';
import LoaderComponent from '../../../LoaderComponent/LoaderComponent';
import { Feather } from '@expo/vector-icons';

export default function ContentSearchResult() {
    const dispatch = useDispatch();
    const search = useSelector(state => state.search.search);
    const [listFilterJob, setListFilterJob] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [q, setQ] = React.useState('');
    const [isOver, setIsOver] = React.useState(false);
    const [total, setTotal] = React.useState(0);

    useEffect(async () => {
        const keyword = await AsyncStorage.getItem('keyword');

        if (keyword) {
            setQ(keyword);
        }
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
            null,
            null,
            null,
            null,
            [],
            [],
            null,
            null,
            'vi',
        ));
        if (currentPage === 0) {
            setListFilterJob(search.posts)
        }
        else {
            setListFilterJob([...listFilterJob, ...search.posts])
        }
        setIsOver(search.is_over);
    }, [currentPage]);
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
                ListFooterComponentStyle={LoaderComponent}
                onEndReachedThreshold={0}
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
                            navation.navigate('PostDetail', {
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
                                    numberOfLines={2}
                                    style={{
                                        fontWeight: 'bold',
                                    }}>
                                    {item.title}
                                </Text>
                                <Text>
                                    {item.company_name}
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        borderWidth: 0.2,
                                        borderRadius: 4,
                                        padding: 3,
                                        backgroundColor: '#f0f0f0',
                                    }}>
                                        {item.district_name}
                                    </Text>
                                    <Text style={{
                                        marginLeft: 10,
                                        fontSize: 12,
                                        borderWidth: 0.2,
                                        borderRadius: 4,
                                        padding: 3,
                                        backgroundColor: '#f0f0f0',
                                    }}>
                                        {item.job_type.job_type_name}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.right}>
                                <Feather name="bookmark" size={24} color="black" />
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
        borderWidth: 0.2,
        borderColor: 'gray',
        borderRadius: 10,
    },
    left: {
        width: '30%',
        height: 100,
        padding: 10,
    },
    center: {
        width: '60%',
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
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 18,
    }
})