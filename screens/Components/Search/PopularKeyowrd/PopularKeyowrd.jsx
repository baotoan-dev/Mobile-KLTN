import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { keywordApi } from '../../../../api/keyword/keywordApi'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchAction } from '../../../../redux/store/Search/searchSlice'
import { useNavigation } from '@react-navigation/native'
import { getAllSearchHistoryAction } from '../../../../redux/store/SearchHistory/getAllSearchHistorySlice'
import LoaderComponent from '../../LoaderComponent/LoaderComponent'
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { searchHistoryApi } from '../../../../api/searchHistory/searchHistoryApi'

export default function PopularKeyowrd() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [keyword, setKeyword] = useState([]);
    const searchHistory = useSelector(state => state.searchHistory.searchHistory);
    const [listSearchHistory, setListSearchHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isOver, setIsOver] = useState(false);
    const [nameHistory, setNameHistory] = useState('');

    const fechtData = async () => {
        try {
            const res = await keywordApi.getAllPopularKeyword();

            if (res && res.data.status_code === 200) {
                setKeyword(res.data.data);
            }
        } catch (error) {
            throw error;
        }
    }

    const loadMoreItem = () => {
        if (!isOver) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    useEffect(() => {
        dispatch(getAllSearchHistoryAction(15, currentPage, 'vi'));
        fechtData();
    }, [])

    useEffect(() => {
        if (searchHistory) {
            if (currentPage === 0) {
                setListSearchHistory(searchHistory.listHistorySearch);
            }
            else {
                setListSearchHistory({
                    ...listSearchHistory,
                    listSearchHistory: listSearchHistory.concat(searchHistory.listHistorySearch),
                });
            }
            setIsOver(searchHistory.is_over);
        }
    }, [searchHistory])

    const handleSearch = (keyword) => {
        AsyncStorage.setItem('keyword', keyword);
        dispatch(getSearchAction(
            keyword,
            null,
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
        navigation.navigate('SearchResult');
    }

    const handleDeleteHistory = async () => {
        try {
            const res = await searchHistoryApi.deleteKeywordSearch(nameHistory);

            if (res && res.data && res.data.code === 200) {
                setListSearchHistory(listSearchHistory.filter(item => item.keyword !== nameHistory));
            }
        } catch (error) {
            throw error;
        }
    }

    const handleDeleteAll = async () => {
        try {
            const res = await searchHistoryApi.deleteAllKeywordSearch();

            if (res && res.data && res.data.code === 200) {
                setListSearchHistory([]);
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <View style={styles.container}>
            {
                listSearchHistory && listSearchHistory && listSearchHistory.length > 0 ? (
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                color: 'black',
                            }}>Tìm kiếm gần đây</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    handleDeleteAll()
                                }}
                            >
                                <Text style={{
                                    fontSize: 15,
                                    color: 'red'
                                }}>
                                    Xóa tất cả
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{
                            height: '90%',
                        }}>
                            <FlatList
                                style={{ marginTop: 10 }}
                                data={listSearchHistory}
                                keyExtractor={item => item.keyword.toString()}
                                loadMoreItem={loadMoreItem}
                                onEndReachedThreshold={0}
                                ListFooterComponentStyle={LoaderComponent}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        handleSearch(item.keyword);
                                    }} style={styles.item}>
                                        <View style={{
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <EvilIcons name="search" size={24} color="black" />
                                                <Text style={{
                                                    marginLeft: 10,
                                                }}>{item.keyword}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => {
                                                setNameHistory(item.keyword);
                                                handleDeleteHistory();
                                            }}>
                                                <AntDesign name="delete" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                        </ScrollView>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.title}>Từ khóa phổ biến</Text>
                        <ScrollView
                            style={{
                                height: '90%',
                            }}
                        >
                            <FlatList
                                style={{ marginTop: 10 }}
                                data={keyword}
                                keyExtractor={item => item.keyword.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        handleSearch(item.keyword);
                                    }} style={styles.item}><Text>{item.keyword}</Text></TouchableOpacity>
                                )}
                            />
                        </ScrollView>
                    </View>
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
    },
    item: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 0.3,
        borderColor: 'gray',
        borderRadius: 10,
        marginTop: 10,
    }
})