import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, ScrollView } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { communityApi } from '../../../../api/community/communityApi';

export default function SeeAllBlog(prop) {
    const type = prop.route.params.type;
    const [isOver, setIsOver] = React.useState(false);
    const [blog, setBlog] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const navigation = useNavigation();
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        fetchData();
    }, []);

    const renderLoader = () => {
        return (
            isOver ? (
                <View>
                    <Text></Text>
                </View>
            ) : (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        );
    };

    const fetchData = async () => {
        try {
            const res = await communityApi.getCommunityNews(currentPage.toString(), "10", "cm", type === 'user' ? 0 : 1, "vi");

            if (res && res.data.status === 200) {
                setBlog(res.data.data.communications);
                setIsOver(res.data.data.is_over);
                setTotal(res.data.data.total);
            }

        } catch (error) {
            throw error
        }
    }

    const loadMoreItem = () => {
        if (!isOver) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 10,
                        marginLeft: 10,
                    }}>Tất cả bài viết</Text>
                </View>
                <Text style={{
                    fontSize: 14,
                    marginBottom: 10,
                
                }}>
                    {`Tất cả bài viết (${total})`}
                </Text>
                <ScrollView>
                    <FlatList
                        data={blog}
                        horizontal={false}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={1}
                        ListFooterComponentStyle={renderLoader}
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
                                                color: '#d3d3d3',
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
        marginTop: 40,
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