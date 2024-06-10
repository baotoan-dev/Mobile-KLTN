import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Clipboard } from 'react-native'
import React from 'react'
import { communityApi } from '../../../../api/community/communityApi';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import { AntDesign } from '@expo/vector-icons';
import ModalComment from '../ModalComment/ModalComment';
import Toast from 'react-native-toast-message';

export default function DetailBlog(prop) {
    const id = prop.route.params.id;
    const [detailBlog, setDetailBlog] = useState({});
    const [showModalComment, setShowModalComment] = useState(false);

    const fetchData = async () => {
        const res = await communityApi.getDetailCommunity(id)

        if (res && res.status === 200) {
            setDetailBlog(res.data.data);
        }
    }

    const handleLikeBlog = async () => {
        const res = await communityApi.postCommunityLike(id);

        if (res && (res.data.status === 200 || res.data.status === 201)) {
            fetchData();
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const copyContentToClipboard = async (content) => {
        await Clipboard.setString(content);
        Toast.show({
            type: 'success',
            text1: 'Sao chép nội dung thành công',
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    detailBlog && (
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingTop: 5,
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        prop.navigation.goBack();
                                    }}
                                >
                                    <Ionicons name="arrow-back" size={24} color="black" />
                                </TouchableOpacity>
                                <Text style={{
                                    fontSize: 22,
                                    fontWeight: 'bold',
                                    marginTop: 20,
                                    marginBottom: 20,
                                    marginLeft: 10,
                                }}>Chi tiết bài blog</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 20,
                            }}>
                                <View>
                                    {detailBlog.profileData?.avatar ? <Image source={{ uri: detailBlog.profileData.avatarPath }} style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25,
                                    }} /> : <Ionicons name="person-circle-outline" size={50} color="black" />}
                                </View>
                                <View style={{
                                    marginLeft: 10,
                                }}>
                                    <Text style={{
                                        fontSize: 13,
                                        color: 'gray',
                                    }}>Tác giả</Text>
                                    <Text>{detailBlog.profileData?.name}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    marginBottom: 10,
                                }}>{detailBlog.title}</Text>
                                <ScrollView
                                    style={{
                                        height: 350,
                                    }}
                                >
                                    <RenderHtml
                                        contentWidth={300} source={{ html: detailBlog.content }}
                                    />
                                </ScrollView>
                            </View>
                            {
                                detailBlog.image && (
                                    <View>
                                        <Image source={{ uri: detailBlog?.image[0].image }} style={{
                                            width: '100%',
                                            height: 160,
                                            borderRadius: 10,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 2,
                                            },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 3.84,
                                            elevation: 3,
                                            marginTop: 10,
                                        }} />
                                    </View>
                                )
                            }
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.5,
                                paddingBottom: 10,
                            }}>
                                {
                                    +detailBlog.communicationLikesCount > 0 ? (
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 10,
                                        }}>
                                            <Ionicons name="heart" size={24} color="red" />
                                            <View style={{
                                                marginLeft: 10,
                                                flexDirection: 'row',
                                            }}>
                                                <Text>{detailBlog.communicationLikesCount}</Text>
                                                <Text style={{
                                                    marginLeft: 5,
                                                }}>
                                                    lượt thích
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                        :
                                        (
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginTop: 10,
                                            }}>
                                                <Ionicons name="eye" size={24} color="black" />
                                                <View style={{
                                                    marginLeft: 10,
                                                    flexDirection: 'row',
                                                }}>
                                                    <Text>{detailBlog.communicationViewsCount}</Text>
                                                    <Text style={{
                                                        marginLeft: 5,
                                                    }}>
                                                        lượt xem
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                }
                                {
                                    detailBlog.communicationCommentsCount > 0 && (
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 10,
                                        }}>
                                            <Ionicons name="chatbox" size={24} color="black" />
                                            <View style={{
                                                marginLeft: 10,
                                                flexDirection: 'row',
                                            }}>
                                                <Text>{detailBlog.communicationCommentsCount}</Text>
                                                <Text style={{
                                                    marginLeft: 5,
                                                }}>
                                                    bình luận
                                                </Text>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 10,
                                width: '100%',
                            }}>
                                <View style={{
                                    width: '33%',
                                }}>
                                    {
                                        detailBlog.liked ? (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    handleLikeBlog();
                                                }}
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: 10,
                                                    borderRadius: 10,
                                                    marginTop: 10,
                                                }}>
                                                <AntDesign name="like1" size={24} color="black" />
                                                <Text style={{
                                                    color: 'black',
                                                    marginLeft: 10,
                                                }}>Đã thích</Text>
                                            </TouchableOpacity>
                                        )
                                            :
                                            (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        handleLikeBlog();
                                                    }}
                                                    style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        padding: 10,
                                                        borderRadius: 10,
                                                        marginTop: 10,
                                                    }}>
                                                    <AntDesign name="like2" size={24} color="black" />
                                                    <Text style={{
                                                        color: 'black',
                                                        marginLeft: 10,
                                                    }}>Thích</Text>
                                                </TouchableOpacity>
                                            )
                                    }
                                </View>
                                <View style={{
                                    width: '33%',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setShowModalComment(true);
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 10,
                                            borderRadius: 10,
                                            marginTop: 10,
                                        }}>
                                        <Ionicons name="chatbox" size={24} color="black" />
                                        <Text style={{
                                            color: 'black',
                                            marginLeft: 10,
                                        }}>Bình luận</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    width: '33%',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            copyContentToClipboard(detailBlog.content);
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 10,
                                            borderRadius: 10,
                                            marginTop: 10,
                                        }}>
                                        <AntDesign name="link" size={24} color="black" />
                                        <Text style={{
                                            color: 'black',
                                            marginLeft: 10,
                                        }}>Sao chép</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
            {
                showModalComment && (
                    <View>
                        <ModalComment
                            showModalComment={showModalComment}
                            setShowModalComment={setShowModalComment}
                            detailBlog={detailBlog}
                            fetchData={fetchData}
                        />
                    </View>
                )

            }
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
    }
})