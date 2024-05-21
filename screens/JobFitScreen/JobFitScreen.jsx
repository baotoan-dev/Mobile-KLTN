import { View, Text, TextInput, Image } from 'react-native'
import React, { useEffect } from 'react'
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNearByJobAction } from '../../redux/store/Nearby/nearbySlice';
import ListJobOfFit from './ListJobOfFit/ListJobOfFit';
import { bookmarksApi } from '../../api/bookmarks/bookmarksApi';
import { getProfileAnalyticsAction } from '../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice';
import { EvilIcons } from '@expo/vector-icons';

export default function JobFitScreen() {
    const dispatch = useDispatch();
    const nearby = useSelector((state) => state.nearby.nearby);
    const [isOver, setIsOver] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [listNearBy, setListNearBy] = React.useState([]);
    const [listNearByFilter, setListNearByFilter] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [id, setId] = React.useState(0);
    const [search, setSearch] = React.useState('');

    useEffect(() => {
        dispatch(getAllNearByJobAction(page, 10, 'vi'));
    }, [])

    useEffect(() => {
        if (search) {
            const newList = listNearBy.filter((item) => {
                return item.title.toLowerCase().includes(search.toLowerCase());
            })
            setListNearByFilter(newList);
        }
        else {
            setListNearByFilter(listNearBy);
        }
    }, [search])

    useEffect(() => {
        if (nearby && nearby.data && nearby.data.posts && page === 0) {
            setListNearBy(nearby.data.posts);
            setIsOver(nearby.data.is_over)
            setTotal(nearby.data.totalPost)
        }
        if (nearby && nearby.data && nearby.data.posts && page > 0) {
            setListNearBy([...listNearBy, ...nearby.data.posts]);
            setIsOver(nearby.data.is_over)
            setTotal(nearby.data.totalPost)
        }
    }, [nearby])

    const handleDeleteBookmark = async () => {
        const res = await bookmarksApi.deleteBookMark(id);

        if (res) {
            const newList = listNearBy.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        bookmarked: false
                    }
                }
                return item;
            })
            setListNearBy(newList);
            dispatch(getProfileAnalyticsAction());
        }
    }

    const handleLoadMore = () => {
        if (!isOver) {
            setPage(page + 1);
            dispatch(getAllNearByJobAction(page + 1, 10, 'vi'));
        }
    }

    const handleCreateBookmark = async () => {
        const res = await bookmarksApi.createBookMark(id);

        if (res) {
            const newList = listNearBy.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        bookmarked: true
                    }
                }
                return item;
            })
            setListNearBy(newList);
            dispatch(getProfileAnalyticsAction());
        }
    }

    return (
        <View>
            <HeaderOfScreen title="Việc làm phù hợp" />
            {
                listNearBy && listNearBy.length > 0 && (
                    <Text style={{
                        paddingHorizontal: 10,
                        marginTop: 10,
                        fontWeight: 'bold'
                    }}>
                        {
                            `Có ${total} công việc phù hợp với bạn`
                        }
                    </Text>
                )
            }
            <View style={{
                margin: 10,
                borderRadius: 10,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: 'gray',
                backgroundColor: 'white',
            }}>
                <EvilIcons style={{
                    marginRight: 5
                }} name="search" size={24} color="black" />
                <TextInput
                    placeholder="Tìm kiếm công việc"
                    onChangeText={(text) => setSearch(text)}
                />
            </View>
            <ListJobOfFit
                listJob={listNearByFilter}
                isOver={isOver}
                handleDeleteBookmark={handleDeleteBookmark}
                handleLoadMore={handleLoadMore}
                handleCreateBookmark={handleCreateBookmark}
                setId={setId}
            />
        </View>
    )
}