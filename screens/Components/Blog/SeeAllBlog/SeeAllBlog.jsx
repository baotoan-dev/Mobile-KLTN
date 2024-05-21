import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import HeaderOfScreen from '../../HeaderOfScreen/HeaderOfScreen';
import { useDispatch, useSelector } from 'react-redux';
import { getCommunitiesAction } from '../../../../redux/store/Community/communitySlice';

export default function SeeAllBlog(prop) {
    const type = prop.route.params ? prop.route.params.type : 'user';
    const dispatch = useDispatch();
    const community = useSelector((state) => state.community.communities);
    const [isOver, setIsOver] = React.useState(false);
    const [blog, setBlog] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const navigation = useNavigation();
    const [total, setTotal] = React.useState(0);

    useEffect(() => {
        dispatch(getCommunitiesAction(0, "10", "cm", type === 'user' ? 0 : 1, "vi"))
    }, []);

    useEffect(() => {
        if (currentPage === 0) {
            setBlog(community.communications);
        } else {
            setBlog((prevBlog) => [...prevBlog, ...community?.communications]);
        }
        setIsOver(community.is_over);
        setTotal(community.total);
    }, [community])

    useEffect(() => {
        dispatch(getCommunitiesAction(currentPage.toString(), "10", "cm", type === 'user' ? 0 : 1, "vi"))
    }, [currentPage])

    const loadMoreItem = () => {
        if (!isOver) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{
                // paddingHorizontal: 20,
            }}>
                <HeaderOfScreen title='Tất cả bài viết' />
                <Text style={{
                    fontSize: 14,
                    paddingHorizontal: 10,
                    marginVertical: 10,
                    color: '#242670'
                }}>
                    {`Tất cả bài viết (${total ? total : 0})`}
                </Text>
                <ScrollView>
                    <FlatList
                        data={blog}
                        horizontal={false}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={1}
                        ListFooterComponent={() => (
                            <View style={{
                                height: 100,
                            }}>
                                {
                                    isOver ? (
                                        <Text></Text>
                                    ) : (
                                        <ActivityIndicator size="large" color="#0000ff" />
                                    )
                                }
                            </View>
                        )}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('DetailBlog', {
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
                                        <Image source={{ uri: item.images[0].image }} style={styles.logo} />
                                    </View>
                                    <View style={styles.center}>
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                fontWeight: 'bold',
                                            }}>
                                            {item.title}
                                        </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: 5,
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                color: '#242670',
                                            }}>
                                                {item.createdAtText}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    item: {
        flexDirection: 'row',
    },
    left: {
        flex: 1,
    },
    center: {
        flex: 3,
        marginLeft: 10,
        justifyContent: 'space-between'
    },
    right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 10,
    }
})