import { StyleSheet, Animated, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useEffect, useRef } from 'react';
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getViewProfilesAction } from '../../redux/store/ViewProfile/viewProfileSlice';
import LoaderComponent from '../Components/LoaderComponent/LoaderComponent';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function ViewProfile() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const viewProfile = useSelector(state => state.viewProfile.viewProfiles);
    const [listViewProfile, setListViewProfile] = React.useState([]);
    const animationTimeout = useRef(null);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [isLastPage, setIsLastPage] = React.useState(false);
    const [animation] = React.useState(new Animated.Value(0));
    const [itemOpacity] = React.useState(new Animated.Value(0));
    const [itemScale] = React.useState(new Animated.Value(0))
    const [refreshing, setRefreshing] = React.useState(false);

    const loadMoreItem = () => {
        if (!isLastPage) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    useEffect(() => {
        dispatch(getViewProfilesAction(currentPage, 10));
    }, [dispatch, currentPage]);

    useEffect(() => {
        Animated.timing(itemOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
        Animated.spring(itemScale, {
            toValue: 1,
            tension: 20,
            friction: 4,
            useNativeDriver: true
        }).start();
    }, []);

    useEffect(() => {
        if (viewProfile) {
            setListViewProfile((prev) => currentPage === 0 ? viewProfile.data : [...prev, ...viewProfile.data]);
            setIsLastPage(viewProfile.isLastPage);
        }
        startAnimationLoop();
    }, [viewProfile]);

    const animateImage = () => {
        Animated.sequence([
            Animated.timing(animation, { toValue: -20, duration: 200, useNativeDriver: true }),
            Animated.timing(animation, { toValue: 0, duration: 200, useNativeDriver: true })
        ]).start();
    };

    const startAnimationLoop = () => {
        animateImage();
        animationTimeout.current = setTimeout(() => {
            animateImage();
            startAnimationLoop();
        }, 3000);
    };

    const hanleRefresh = () => {
        setRefreshing(true);
        setCurrentPage(0);
        dispatch(getViewProfilesAction(0, 10));
        setRefreshing(false);
    }

    return (
        <Animated.ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={hanleRefresh} />
            }
        >
            <HeaderOfScreen title='Xem hồ sơ' />
            {listViewProfile && listViewProfile.length > 0 ? (
                <Animated.View>
                    <Text style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        marginTop: 10,
                        paddingHorizontal: 10
                    }}>
                        {
                            `Tìm thấy ${listViewProfile.length} nhà tuyển dụng`
                        }
                    </Text>
                    <FlatList
                        data={listViewProfile}
                        keyExtractor={item => item.id}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={<LoaderComponent isOver={isLastPage} />}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('CompanyDetail', { id: item.company.id })
                                }}
                            >
                                <Animated.View style={[styles.item, {
                                    opacity: itemOpacity,
                                    transform: [{ scale: itemScale }]
                                }]}>
                                    <Animated.View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Animated.View>
                                            <Image
                                                source={{ uri: item.company?.logo ? item.company?.logo : 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1702047527/images/avatar/1702047524545-59c27fe7-3919-4a8d-a150-984d9428f184.jpg' }}
                                                style={{ width: 50, height: 50 }}
                                            />
                                        </Animated.View>
                                        <Animated.View style={{
                                            marginLeft: 10
                                        }}>
                                            <Text style={{
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            }}>{item.company?.name}</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: 'gray'
                                            }}>{item.company?.companyRole?.name}</Text>
                                        </Animated.View>
                                    </Animated.View>
                                    <Animated.View>
                                        <Text style={{
                                            fontSize: 12,
                                            color: 'gray'
                                        }}>
                                            {
                                                moment(item.createdAt).format('DD/MM/YYYY')
                                            }
                                        </Text>
                                    </Animated.View>
                                </Animated.View>
                            </TouchableOpacity>
                        )}
                    />
                </Animated.View>
            ) : (
                <Animated.View style={[styles.noData, { transform: [{ translateY: animation }] }]}>
                    <Animated.Image
                        source={require('../../images/no-data.png')}
                        style={{ width: 100, height: 100 }}
                    />
                    <Text style={{
                        marginTop: 10,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}>Không có dữ liệu</Text>
                </Animated.View>
            )}
        </Animated.ScrollView>
    );
}

const styles = StyleSheet.create({
    noData: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 200
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: '#242670',
        borderWidth: 0.5,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'space-between'
    }
});
