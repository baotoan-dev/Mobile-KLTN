import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ModalAddCv({
    showModalAddCv,
    setShowModalAddCv
}) {
    const navigation = useNavigation()
    return (
        <View>
            <Modal
                isVisible={showModalAddCv}
                onBackdropPress={() => setShowModalAddCv(false)}
                onSwipeComplete={() => setShowModalAddCv(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View style={styles.container}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderBottomColor: 'gray',
                        backgroundColor: '#FFF2E1',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>
                            Thêm CV mới
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModalAddCv(false)
                            }}
                            style={{
                                marginLeft: 'auto'
                            }}>
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 20,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ThemeCvList')
                            }}
                        >
                            <View style={{
                                borderWidth: 0.8,
                                borderRadius: 3,
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 10,
                                borderColor: '#97E7E1',
                                backgroundColor: '#F6F5F2',
                            }}>
                                <AntDesign name="addfile" size={24} color="black" />
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginLeft: 10
                                }}>
                                    Thêm CV mới
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{
                                padding: 10,
                                borderWidth: 0.8,
                                borderRadius: 3,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 10,
                                borderColor: '#97E7E1',
                                backgroundColor: '#F6F5F2',
                            }}>
                                <AntDesign name="clouduploado" size={24} color="black" />
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    marginLeft: 10
                                }}>
                                    Chọn CV từ máy
                                </Text>
                            </View>
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
        backgroundColor: 'white',
        width: '100%',
        height: '30%',
        borderRadius: 10,
    }
})
