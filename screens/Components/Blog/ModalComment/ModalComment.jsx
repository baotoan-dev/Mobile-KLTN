import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ModalComment({
    showModalComment,
    setShowModalComment,
    detailBlog
}) {
    const [comment, setComment] = React.useState('')

    const handleComment = () => {
        
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
                                borderBottomWidth: 0.5
                            }}>
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 100,
                                    backgroundColor: 'gray'
                                }}></View>
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