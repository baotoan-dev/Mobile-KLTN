import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { MaterialIcons } from '@expo/vector-icons';
export default function ModalConfirmDelete({
    showModalConfirmDelete,
    setShowModalConfirmDelete,
    handleDeleteCv,
}) {
    return (
        <View>
            <Modal
                isVisible={showModalConfirmDelete}
                onBackdropPress={() => setShowModalConfirmDelete(false)}
                onBackButtonPress={() => setShowModalConfirmDelete(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.centerModal}
            >
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '30%',
                    borderRadius: 10,
                }}>
                    <View style={styles.header}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>Xác nhận</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModalConfirmDelete(false);
                            }}
                        >
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View>
                            <Text style={{
                                fontSize: 15,
                            }}>
                                Bạn có chắc chắn muốn xóa CV này không?
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            padding: 10,
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleDeleteCv();
                                    setShowModalConfirmDelete(false);
                                }}
                                style={{
                                    backgroundColor: 'red',
                                    padding: 10,
                                    borderRadius: 5,
                                    width: '35%',
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}>
                                    Xóa
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModalConfirmDelete(false);
                                }}
                                style={{
                                    backgroundColor: 'blue',
                                    padding: 10,
                                    borderRadius: 5,
                                    width: '35%',
                                }}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    )
}

const styles = StyleSheet.create({
    centerModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        padding: 10,
    },
    content: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    bottom: {

    }
})