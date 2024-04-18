import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import Heading from '../Heading/Heading'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import { useEffect } from 'react'
import { Color } from '../../../utils/Color'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { Ionicons } from '@expo/vector-icons';
import { bookmarksApi } from '../../../api/bookmarks/bookmarksApi'
import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { getProfileAnalyticsAction } from '../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice'
import { getNewPostAction } from '../../../redux/store/NewPost/newPostSlice'
import { useSelector } from 'react-redux'

const SCREEN_WIDTH = Dimensions.get("screen").width - 45;

export default function NewJob() {
    const [newJob, setNewJob] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const isCarousel = React.useRef(null)
    const [index, setIndex] = React.useState(0)
    const [accountId, setAccountId] = useState('');
    const newPost = useSelector(state => state.newPost.newPost);

    const getNewJob = async () => {
        dispatch(getNewPostAction(
            null,
            null,
            null,
            null,
            16,
            null,
            "vi",
            currentPage
        ))
    }

    useEffect(() => {
        if (newPost && newPost.data && newPost.data.length > 0) {
            const newData = [];
            for (let i = 0; i < newPost.data.length; i += 4) {
                newData.push(newPost.data.slice(i, i + 4));
            }
            setNewJob(newData);

        }
    }, [newPost])

    useEffect(() => {
        const getAccountId = async () => {
            const accountId = await SecureStore.getItemAsync('accountId');
            setAccountId(accountId)
        }
        getAccountId();
    }, [])

    const handleSeeMore = () => {
        navigation.navigate('AllPostNewest')
    }

    useEffect(() => {
        getNewJob();
    }, [currentPage])

    const handleCreateBookmark = async (postId) => {
        try {
            const res = await bookmarksApi.createBookMark(postId);

            if (res && res.data && res.data.code === 200) {
                getNewJob();
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
                getNewJob();
                dispatch(getProfileAnalyticsAction())
            }
        } catch (error) {
            console.error("Error in handleDeleteBookmark:", error);
        }
    }

    return (
        <View style={styles.container}>
            <Heading props={{ title: 'Công việc mới nhất', extra: 'Xem thêm', handleSeeMore: handleSeeMore }} />
            <Carousel
                data={newJob}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={SCREEN_WIDTH}
                layout={'default'}
                ref={isCarousel}
                useScrollView={true}
                // loop={true}
                // autoplayInterval={5000}
                onSnapToItem={(index) => {
                    if (index === newJob.length - 1) {
                        getNewJob();
                    }
                    setIndex(index)
                }}
                renderItem={({ item, index }) => (
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={item}
                        horizontal={false}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('PostDetail', { id: item.id });
                            }}>
                                <View style={styles.item}>
                                    <View style={{
                                        flexDirection: 'row',
                                    }}>
                                        <View style={styles.imageContainer}>
                                            <Image source={{ uri: item.image }} style={styles.image} />
                                        </View>
                                        <View style={styles.contentContainer}>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    fontSize: 12,
                                                    fontWeight: 'bold',
                                                    color: Color.primary,
                                                    width: 150,
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >{(item.title)}</Text>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    fontSize: 10,
                                                    color: 'gray',
                                                }}>
                                                {item.companyName}
                                            </Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                gap: 10,
                                                alignItems: 'center',
                                                marginTop: 5,
                                                flexWrap: 'wrap',
                                            }}>
                                                <Text style={styles.extraInfor}>
                                                    {item.location.district.fullName}
                                                </Text>
                                                <Text style={styles.extraInfor}>
                                                    {item.jobType.name}
                                                </Text>
                                            </View>
                                            <Text
                                                style={styles.textSalary}
                                                numberOfLines={1}
                                            >
                                                {item.salaryMin + ' - ' + item.salaryMax + ' ' + item.moneyType}
                                            </Text>
                                        </View>
                                    </View>
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
                            </TouchableOpacity>
                        )}
                    />
                )
                }
            >
            </Carousel>
            <Pagination
                dotsLength={newJob.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#6AD4DD',
                }}
                tappableDots={true}
                inactiveDotStyle={{
                    backgroundColor: 'black',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    item: {
        borderWidth: 0.2,
        borderColor: '#97E7E1',
        borderWidth: 0.5,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        margin: 5,
        width: SCREEN_WIDTH - 5,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    imageContainer: {
        marginRight: 10,
    },
    contentContainer: {
        flexDirection: 'column',
        gap: 1,
    },
    extraInfor: {
        fontSize: 10,
        color: 'gray',
        padding: 3,
        borderRadius: 2,
        fontWeight: 'bold',
        marginRight: 10,
        backgroundColor: '#DFF5FF',
    },
    textSalary: {
        fontSize: 10,
        color: 'gray',
        marginTop: 5,
        padding: 3,
        // blue
        backgroundColor: '#F1EEDC',
        borderRadius: 2,
        width: 60,
        borderColor: '#C4E4FF',
        borderRadius: 5,
        fontWeight: 'bold',
    },
})