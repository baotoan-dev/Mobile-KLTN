import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import HeaderFIlterAllPostNewest from './HeaderFIlterAllPostNewest/HeaderFIlterAllPostNewest';
import { useDispatch, useSelector } from 'react-redux';
import { getNewPostAction } from '../../../../redux/store/NewPost/newPostSlice';
import ListJobOfAllNewest from './ListJobOfAllNewest/ListJobOfAllNewest';
import { bookmarksApi } from '../../../../api/bookmarks/bookmarksApi';
import { getProfileAnalyticsAction } from '../../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice';

export default function AllPostNewest() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const newPost = useSelector(state => state.newPost.newPost);
    const [currentPage, setCurrentPage] = React.useState(0)
    const [keyword, setKeyword] = React.useState('')
    const [listJob, setListJob] = React.useState([])
    const [totalPage, setTotalPage] = React.useState(0)
    const [isOver, setIsOver] = React.useState(false)
    const [listJobFilter, setListJobFilter] = React.useState([])
    const [dataCategoryFilter, setDataCategoryFilter] = React.useState({});
    const [dataLocationFilter, setDataLocationFilter] = React.useState({});

    useEffect(() => {
        dispatch(getNewPostAction(
            null,
            null,
            null,
            null,
            10,
            0,
            'vi',
            0
        )).then(() => {
            setListJob(newPost.data);
            setTotalPage(newPost.totalPage);
            setIsOver(newPost.is_over);
        })
    }, [])

    useEffect(() => {
        dispatch(getNewPostAction(
            null,
            dataCategoryFilter ? dataCategoryFilter.parent_category_id : null,
            null,
            dataLocationFilter ? dataLocationFilter.id : null,
            10,
            0,
            'vi',
            currentPage
        )).then(() => {
            if (currentPage > 0) {
                setListJob(prevListJob => [...prevListJob, ...newPost.data]);
            } else {
                return
            }
            setTotalPage(newPost.totalPage);
            setIsOver(newPost.is_over);
        })
    }, [currentPage]);


    useEffect(() => {
        dispatch(getNewPostAction(
            null,
            dataCategoryFilter ? dataCategoryFilter.parent_category_id : null,
            null,
            dataLocationFilter ? dataLocationFilter.id : null,
            16,
            0,
            'vi',
            0
        )).then(() => {
            setListJob(newPost.data);
            setTotalPage(newPost.totalPage);
            setIsOver(newPost.is_over);
        })
    }, [dataCategoryFilter, dataLocationFilter]);

    const handleLoadMore = () => {
        if (!isOver && currentPage < totalPage - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleCreateBookmark = async (id) => {
        const res = await bookmarksApi.createBookMark(id);

        if (res && res.data.code === 200) {
            const newListJobAfterBookmak = listJob.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        bookmarked: true
                    }
                }
                return item;
            })
            dispatch(getNewPostAction(
                null,
                null,
                null,
                null,
                16,
                0,
                'vi',
                0
            ))
            setListJob(newListJobAfterBookmak)
            dispatch(getProfileAnalyticsAction())
        }
    }

    const handleDeleteBookmark = async (id) => {
        const res = await bookmarksApi.deleteBookMark(id);

        if (res && res.data.code === 200) {
            dispatch(getProfileAnalyticsAction())
            const newListJobAfterBookmak = listJob.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        bookmarked: false
                    }
                }
                return item;
            })
            dispatch(getNewPostAction(
                null,
                null,
                null,
                null,
                16,
                0,
                'vi',
                0
            ))
            setListJob(newListJobAfterBookmak)
        }
    }

    const handleSearch = (keyword) => {
        if (keyword === '') {
            setListJobFilter(listJob)
        }
        else {
            const listJobFilter = newPost.data.filter((item) => {
                return item.title.toLowerCase().includes(keyword.toLowerCase())
            })
            setListJobFilter(listJobFilter)
        }
    }

    useEffect(() => {
        handleSearch(keyword)
    }, [keyword])

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="#242670" />
                </TouchableOpacity>
                <Text style={{
                    marginLeft: 5,
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: '#242670'
                }}>
                    Việc làm tốt nhất
                </Text>
            </View>
            <HeaderFIlterAllPostNewest
                handleSearch={handleSearch}
                setKeyword={setKeyword}
                dataCategoryFilter={dataCategoryFilter}
                setDataCategoryFilter={setDataCategoryFilter}
                dataLocationFilter={dataLocationFilter}
                setDataLocationFilter={setDataLocationFilter}
            />
            <ListJobOfAllNewest
                handleCreateBookmark={handleCreateBookmark}
                handleDeleteBookmark={handleDeleteBookmark}
                isOver={isOver}
                listJob={listJobFilter.length > 0 ? listJobFilter : listJob}
                handleLoadMore={handleLoadMore}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 30,
        paddingBottom: 10,
        backgroundColor: 'white',
    }
})