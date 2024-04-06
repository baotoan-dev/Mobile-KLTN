import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal'
import { Ionicons } from '@expo/vector-icons';
import { communityApi } from '../../../../../api/community/communityApi';

export default function ModalUpdateComment({
    openModalUpdateComment,
    setOpenModalUpdateComment,
    contentComment,
    profile,
    commentId,
    blogId,
    fetchData,
    setViewAction
}) {
    const [comment, setComment] = React.useState(contentComment)

    const handleUpdateComment = async () => {
        const res = await communityApi.putCommunityComment(blogId, commentId, {
            content: comment,
            communicationId: blogId,
            images: []
        })
        if (res && res.status === 200) {
            fetchData()
            setOpenModalUpdateComment(false)
            setViewAction(false)
        }   
    }
    useEffect(() => {
        setComment(contentComment)
    }, [contentComment])
    return (
        <View>
            <Modal
                isVisible={openModalUpdateComment}
                onBackdropPress={() => setOpenModalUpdateComment(false)}
                onSwipeComplete={() => setOpenModalUpdateComment(false)}
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
                        paddingVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={() => setOpenModalUpdateComment(false)}
                            style={{
                                alignItems: 'flex-start'
                            }}>
                            <Ionicons name="arrow-back-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={{
                            marginLeft: 5,
                            fontSize: 15,
                            fontWeight: 'bold',
                        }}>
                            Chỉnh sửa bình luận
                        </Text>
                    </View>
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: 10,
                    }}>
                        <View style={{
                            width: '10%'
                        }}>
                            <Image
                                source={{ uri: profile.avatarPath }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                }} />
                        </View>
                        <View style={{
                            width: '85%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            borderColor: 'gray',
                            paddingHorizontal: 10,
                            backgroundColor: '#FFF2E1',
                        }}>
                            <TextInput
                                style={styles.input}
                                value={comment}
                                onChangeText={setComment}
                                placeholder="Nhập bình luận"
                            />
                        </View>
                    </View>
                    <View style={{
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                    }}>
                        <TouchableOpacity
                            onPress={() => setOpenModalUpdateComment(false)}
                            style={[styles.button, {
                                backgroundColor: 'gray',
                            }]}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                Hủy
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleUpdateComment()}
                            style={[styles.button, {
                                backgroundColor: 'green',
                                marginLeft: 10
                            }]}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                Gửi
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        height: 40,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: 50,
    }
})