import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { MaterialIcons } from '@expo/vector-icons';

export default function ModalShowHideCV({
    modalShowHideCv,
    setModalShowHideCv,
    statusCv
}) {

    return (
        <View>
            <Modal
                isVisible={modalShowHideCv}
                onBackdropPress={() => setModalShowHideCv(false)}
                onSwipeComplete={() => setModalShowHideCv(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '40%',
                    borderRadius: 10,
                }}>
                    <View style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: '40%',
                        borderRadius: 10,
                    }}>
                        <View style={styles.header}>
                            <View style={{
                                flex: 1,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }}>{statusCv ? 'Hiện CV' : 'Ẩn CV'}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalShowHideCv(false);
                                }}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 10,
                                }}>
                                <MaterialIcons name="cancel" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        marginTop: -50
                    }}>
                        <Animated.Image
                            source={require('../../../images/hideCV.png')}
                            style={{
                                width: 150,
                                height: 150,
                                alignSelf: 'center',
                            }}
                        >
                        </Animated.Image>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 14,
                            color: 'gray',                        
                        }}>
                            {statusCv ? 'Ẩn CV nhà tuyển dụng sẽ không thể biết thông tin của bạn' : 'Hiện CV nhà tuyển dụng sẽ có thể biết thông tin của bạn'}
                        </Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2,
        paddingBottom: 10,
    },
})

