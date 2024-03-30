import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { keywordApi } from '../../../../api/keyword/keywordApi'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchAction } from '../../../../redux/store/Search/searchSlice'
import { useNavigation } from '@react-navigation/native'

export default function PopularKeyowrd() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [keyword, setKeyword] = useState([]);
    const { search, loading, error } = useSelector(state => state.search);

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

    useEffect(() => {
        fechtData();
    }, [])

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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Từ khóa phổ biến</Text>
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