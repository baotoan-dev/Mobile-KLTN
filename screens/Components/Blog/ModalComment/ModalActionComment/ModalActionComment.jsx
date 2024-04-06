import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { communityApi } from '../../../../../api/community/communityApi';
import ModalVerifyAction from '../ModalVerifyAction/ModalVerifyAction';
import ModalUpdateComment from '../ModalUpdateComment/ModalUpdateComment';

export default function ModalActionComment({
    viewAction,
    setViewAction,
    commentId,
    fetchData,
    blogId,
    contentComment,
    profile
}) {
    const [openModalVeritfyAction, setOpenModalVerifyAction] = React.useState(false)
    const [openModalUpdateComment, setOpenModalUpdateComment] = React.useState(false)
    const handleDeleteComment = async (blogId, commentId) => {
        const response = await communityApi.deleteComment(blogId, commentId)

        if (response && response.data.status === 200) {
            fetchData()
            setViewAction(false)
        }
    }
    return (
        <View>
            <Modal
                isVisible={viewAction}
                onBackdropPress={() => setViewAction(false)}
                onSwipeComplete={() => setViewAction(false)}
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
                    }}>
                        <TouchableOpacity
                            onPress={() => setViewAction(false)}
                            style={{
                                alignItems: 'flex-end'
                            }}>
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginTop: 20,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setOpenModalVerifyAction(true)
                            }}
                            style={styles.item}>
                            <AntDesign name="delete" size={24} color="black" />
                            <Text style={styles.ml}>Xóa bình luận</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setOpenModalUpdateComment(true)
                            }}
                            style={[styles.item, {
                                marginTop: 20
                            }]}>
                            <AntDesign name="edit" size={24} color="black" />
                            <Text style={styles.ml}>Chỉnh sửa bình luận</Text>
                        </TouchableOpacity>
                        <View style={[styles.item, {
                            marginTop: 20
                        }]}>
                            <AntDesign name="link" size={24} color="black" />
                            <Text style={styles.ml}>Sao chép</Text>
                        </View>
                    </View>
                </View>
            </Modal>
            {
                openModalVeritfyAction && (
                    <ModalVerifyAction
                        openModalVeritfyAction={openModalVeritfyAction}
                        setOpenModalVerifyAction={setOpenModalVerifyAction}
                        handleDeleteComment={handleDeleteComment}
                        contentTop="Bạn có chắc chắn muốn xóa bình luận này không?"
                        blogId={blogId}
                        commentId={commentId}
                    />
                )
            }
            {
                openModalUpdateComment && (
                    <ModalUpdateComment
                        openModalUpdateComment={openModalUpdateComment}
                        setOpenModalUpdateComment={setOpenModalUpdateComment}
                        contentComment={contentComment}
                        profile={profile}
                        commentId={commentId}
                        blogId={blogId}
                        fetchData={fetchData}
                        setViewAction={setViewAction}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        height: '30%',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ml: {
        marginLeft: 10,
    }
})  