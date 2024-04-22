import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getProfileAction } from '../../../../redux/store/Profile/profileSilce';
import { communityApi } from '../../../../api/community/communityApi';
import ModalActionComment from './ModalActionComment/ModalActionComment';

export default function ModalComment({
    showModalComment,
    setShowModalComment,
    detailBlog,
    fetchData,
}) {
    const [comment, setComment] = React.useState('')
    const [accountId, setAccountId] = React.useState('')
    const [viewAction, setViewAction] = React.useState(false)
    const [contentComment, setContentComment] = React.useState('')
    const [commentId, setCommentId] = React.useState('')
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)

    useEffect(() => {
        dispatch(getProfileAction('vi'))
    }, [])

    useEffect(() => {
        if (profile) {
            setAccountId(profile.accountId)
        }
    }, [profile])

    const handleComment = async () => {
        const response = await communityApi.postCommunityComment({
            communicationId: detailBlog.id,
            content: comment
        })

        if (response && response.data.status === 201) {
            setComment('')
            fetchData()
        }
    }
    return (
        <View>
            <Modal
                isVisible={showModalComment}
                onBackdropPress={() => setShowModalComment(false)}
                onSwipeComplete={() => setShowModalComment(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View
                    style={styles.container}>
                    <View style={{
                        marginTop: 10,
                        paddingHorizontal: 10,
                        borderBottomColor: 'gray',
                        borderBottomWidth: 0.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: 10
                    }}>
                        {
                            detailBlog.communicationLikesCount > 0 && (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        borderWidth: 0.5,
                                        padding: 5,
                                        borderRadius: 100,
                                        borderColor: 'gray',
                                        backgroundColor: 'blue',
                                    }}>
                                        <AntDesign name="like2" size={18} color="white" />
                                    </View>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        marginLeft: 5
                                    }}>
                                        {detailBlog?.communicationLikesCount}
                                    </Text>
                                </View>
                            )
                        }
                        {
                            detailBlog.liked === false && (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 10
                                }}>
                                    <AntDesign name="like2" size={24} color="gray" />
                                </View>
                            )
                        }
                    </View>
                    <FlatList
                        data={detailBlog.communicationCommentsData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{
                                flexDirection: 'row',
                                padding: 10,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 0.5,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: 90,
                                zIndex: 200,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 100,
                                        backgroundColor: 'gray'
                                    }}>
                                        <Image source={{ uri: item.profile.avatar }} style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 100,
                                        }} />
                                    </View>
                                    <View style={{
                                        marginLeft: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>
                                            {item.profile.name}
                                        </Text>
                                        <Text>
                                            {item.content}
                                        </Text>
                                    </View>
                                </View>
                                {
                                    item.profile.id === accountId && (
                                        <TouchableOpacity
                                            style={{
                                                position: 'relative'
                                            }}
                                            onPress={() => {
                                                setViewAction(!viewAction)
                                                setCommentId(item.id)
                                                setContentComment(item.content)
                                            }}
                                        >
                                            <AntDesign name="ellipsis1" size={24} color="black" />
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        )}
                    />
                    <View style={styles.containerInput}>
                        <View style={styles.input}>
                            <TextInput
                                style={{
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                }}
                                value={comment}
                                onChangeText={setComment}
                                placeholder="Viết bình luận...."
                            />
                            {
                                comment.length > 0 && (
                                    <TouchableOpacity onPress={() => {
                                        handleComment()
                                    }}>
                                        <Ionicons name="send" size={24} color="black" />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                </View>
            </Modal>
            {
                viewAction && (
                    <ModalActionComment
                        viewAction={viewAction}
                        setViewAction={setViewAction}
                        commentId={commentId}
                        blogId = {detailBlog.id}
                        fetchData={fetchData}
                        contentComment={contentComment}
                        profile={profile}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
        width: '100%',
    },
    container: {
        marginTop: 22,
        backgroundColor: 'white',
        width: '100%',
        height: '90%',
    },
    input: {
        position: 'absolute',
        bottom: 0,
        width: '96%',
        borderWidth: 0.2,
        borderRadius: 5,
        backgroundColor: '#FFF2E1',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    containerInput: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 60,
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        backgroundColor: 'white',
    }
});