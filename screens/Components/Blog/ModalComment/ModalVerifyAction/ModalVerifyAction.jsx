import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'

export default function ModalVerifyAction({
    openModalVeritfyAction,
    setOpenModalVerifyAction,
    handleDeleteComment,
    contentTop,
    blogId,
    commentId
}) {
    return (
        <View>
            <Modal
                isVisible={openModalVeritfyAction}
                onBackdropPress={() => setOpenModalVerifyAction(false)}
                onSwipeComplete={() => setOpenModalVerifyAction(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.centerModal}
            >
                <View
                    style={styles.container}>
                    <Text style={{
                        lineHeight: 20,
                        fontSize: 16,
                        color: 'gray',
                    }}>
                        {
                            contentTop
                        }
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 20,
                        alignItems: 'flex-end',
                    }}>
                        <View
                            style={{
                                marginTop: 10,
                                paddingHorizontal: 10,
                            }}>
                            <TouchableOpacity
                                onPress={() => setOpenModalVerifyAction(false)}
                                style={{
                                    alignItems: 'flex-end'
                                }}>
                                <Text>
                                    Hủy
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            marginTop: 20,
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleDeleteComment(blogId, commentId)
                                }}
                                style={styles.item}>
                                <Text style={[styles.ml, {
                                    color: 'blue',
                                }]}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centerModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        marginTop: 22,
        backgroundColor: 'white',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        width: '90%',
        height: '20%',
        padding: 20,
    },
})