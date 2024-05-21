import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen'
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookmarkAction } from '../../redux/store/Bookmark/bookmarkSlice';
import Animated from 'react-native-reanimated';
import ListJobComponent from '../Components/ListJobComponent/ListJobComponent';
import { bookmarksApi } from '../../api/bookmarks/bookmarksApi';
import { getProfileAnalyticsAction } from '../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice';

export default function BookmarkScreen() {
    const dispatch = useDispatch();
    const bookmark = useSelector(state => state.bookmark.bookmarks);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [listBookmark, setListBookmark] = React.useState([]);
    const [isOver, setIsOver] = React.useState(false);

    useEffect(() => {
        dispatch(getAllBookmarkAction(0, 10, currentPage, 'vi'));
    }, [])

    useEffect(() => {
        if (bookmark && currentPage === 0) {
            setListBookmark(bookmark.data);
        }
        else {
            setListBookmark([...listBookmark, ...bookmark.data]);
        }
        setIsOver(bookmark.is_over)
    }, [bookmark])

    const handleDeleteBookmark = async (id) => {
        const res = await bookmarksApi.deleteBookMark(id);

        if (res && res.data.code === 200) {
            const newListBookmark = listBookmark.filter(item => item.id !== id);
            setListBookmark(newListBookmark);
            dispatch(getProfileAnalyticsAction());
        }
    }

    return (
        <View style={{
            backgroundColor: 'white',
        }}>
            <HeaderOfScreen title="Đã lưu" />
            {
                listBookmark && listBookmark.length === 0 ? (
                    <View style={{
                        marginTop: 100
                    }}>
                        <Image
                            source={require('../../images/no-data.png')}
                            style={{
                                width: 200,
                                height: 200,
                                alignSelf: 'center'
                            }}
                        />
                        <Text style={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 18
                        }}>
                            Bạn chưa lưu bài viết nào
                        </Text>
                    </View>
                ) :
                    (
                        <View>
                            <Animated.Text style={{
                                padding: 10,
                                fontWeight: 'bold',
                            }}>
                                {
                                    `Tổng số bài đã lưu: ${listBookmark && listBookmark.length}`
                                }
                            </Animated.Text>
                            <ListJobComponent isApply={false} isShow={true} listJob={listBookmark} isOver={isOver} handleDeleteBookmark={handleDeleteBookmark} />
                        </View>
                    )
            }

        </View>
    )
}
