import React, { useEffect } from 'react';
import { View, Text, FlatList, Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createFollowCompanyAction, getFollowCompanyAction } from '../../../redux/store/FollowCompany/followCompanySlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getProfileAnalyticsAction } from '../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice';
import { useNavigation } from '@react-navigation/native';

export default function ContentFollowing() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [listCompanyFollowing, setListCompanyFollowing] = React.useState([]);
    const follow = useSelector(state => state.follow.followCompany);
    const animatedValues = React.useRef([]);

    useEffect(() => {
        dispatch(getFollowCompanyAction());
    }, []);

    useEffect(() => {
        if (follow) {
            setListCompanyFollowing(follow);
            animatedValues.current = Array(follow.length)
                .fill(0)
                .map(() => new Animated.Value(0));
        }
    }, [follow]);

    const animateItem = (index) => {
        Animated.timing(animatedValues.current[index], {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const handleDeleteFollowCompany = (companyId) => {

        dispatch(createFollowCompanyAction(companyId));

        const filteredData = listCompanyFollowing.filter(item => +item.companyInfo.id !== +companyId);

        setListCompanyFollowing(filteredData);

        dispatch(getFollowCompanyAction());

        dispatch(getProfileAnalyticsAction());

    }


    return (
        <Animated.View style={styles.container}>
            {listCompanyFollowing && listCompanyFollowing.length > 0 && (
                <Animated.View>
                    <Text
                        style={[
                            styles.text,
                            {
                                transform: [
                                    {
                                        translateY: animatedValues.current[0]?.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-50, 0],
                                        })?.translateY || 0,
                                    },
                                ],
                            },
                        ]}
                    >
                        Tìm thấy {listCompanyFollowing.length} công ty
                    </Text>
                    <FlatList
                        data={listCompanyFollowing}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('CompanyDetail', { id: item.companyInfo.id })
                                }}
                            >
                                <Animated.View
                                    style={[
                                        {
                                            opacity: animatedValues.current[index]?.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, 1],
                                            }) || 1,
                                            transform: [
                                                {
                                                    translateY: animatedValues.current[index]?.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [50, 0],
                                                    }) || 0,
                                                },
                                            ],
                                        },
                                        styles.item,
                                    ]}
                                >
                                    <Animated.View style={styles.left}>
                                        <Animated.Image
                                            source={{ uri: item.companyInfo?.logoPath }}
                                            style={{ width: 50, height: 50 }}
                                        />
                                        <View style={styles.right}>
                                            <Text numberOfLines={1} style={styles.name}>{item.companyInfo?.name}</Text>
                                            <Text style={styles.address}>{item.companyInfo?.address}</Text>
                                        </View>
                                    </Animated.View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleDeleteFollowCompany(item.companyInfo?.id);
                                        }}
                                    >
                                        <MaterialCommunityIcons name="delete-circle" size={24} color="black" />
                                    </TouchableOpacity>
                                </Animated.View>
                            </TouchableOpacity>
                        )}
                        onLayout={() => {
                            listCompanyFollowing.forEach((_, index) => {
                                animateItem(index);
                            });
                        }}
                    />
                </Animated.View>
            )}
            {
                listCompanyFollowing && listCompanyFollowing.length === 0 && (
                    <Animated.View>
                        <Animated.Image
                            source={require('../../../images/no-data.png')}
                            style={{
                                width: 100,
                                height: 100,
                                alignSelf: 'center',
                                marginTop: 100,
                            }}
                        >
                        </Animated.Image>
                        <Animated.Text
                            style={[
                                styles.text,
                                {
                                    textAlign: 'center',
                                }
                            ]}>
                            Không có công ty nào
                        </Animated.Text>
                    </Animated.View>
                )
            }
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderColor: '#242670',
        borderWidth: 0.5,
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        justifyContent: 'space-between',
        width: '100%',
    },
    right: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    address: {
        fontSize: 14,
        color: 'gray',
    },
    left: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
    }
});
