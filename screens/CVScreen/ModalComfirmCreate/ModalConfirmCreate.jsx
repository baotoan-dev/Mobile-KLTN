import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { deleteCvProjectAction } from '../../../redux/store/CvProject/cvProjectSlice';
import { deleteCvLayoutAction } from '../../../redux/store/CvLayout/cvLayoutSlice';
import { deleteCvExtraInformationAction } from '../../../redux/store/CvExtraInformation/CvExtraInformationSlice';
import { deleteCvInformationAction } from '../../../redux/store/CvInFormation/cvInformationSlice';
import { useNavigation } from '@react-navigation/native';

export default function ModalConfirmCreate({
    showModalConfirmCreate,
    setShowModalConfirmCreate,
    cvIndex,
    templateId,
}) {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleCancelRecorveryCv = () => {
        dispatch(deleteCvProjectAction(cvIndex))
        dispatch(deleteCvLayoutAction(cvIndex))
        dispatch(deleteCvExtraInformationAction(cvIndex))
        dispatch(deleteCvInformationAction(cvIndex))

        setTimeout(() => {
            navigation.navigate(
                'PDFScreen',
                {
                    templateId: templateId,
                    typeAction: 'create',
                    cvIndexParent: 0,
                }
            )
        }, 1000)

    }
    return (
        <Modal
            isVisible={showModalConfirmCreate}
            style={styles.centerModal}
            onBackdropPress={() => setShowModalConfirmCreate(false)}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>
                            Khôi phục CV
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setShowModalConfirmCreate(false);
                        }}
                    >
                        <MaterialIcons name="cancel" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{
                        fontSize: 15,
                        marginTop: 10,
                        textAlign: 'center',
                        color: 'gray'
                    }}>
                        Bạn có chắc chắn muốn khôi phục CV này không?
                    </Text>
                </View>
                <View style={{
                    marginTop: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        padding: 10,
                        width: '100%',
                    }}>
                        <TouchableOpacity
                            style={{
                                width: '50%',
                            }}
                            onPress={() => {
                                handleCancelRecorveryCv()
                                setShowModalConfirmCreate(false)
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                backgroundColor: 'red',
                                padding: 5,
                                width: '100%',
                                marginRight: 10,
                                textAlign: 'center',
                                fontSize: 14,
                                borderRadius: 5,
                            }}>
                                Hủy
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '50%',
                            }}
                            onPress={() => setShowModalConfirmCreate(false)}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                backgroundColor: 'green',
                                padding: 5,
                                width: '100%',
                                marginLeft: 10,
                                textAlign: 'center',
                                fontSize: 14,
                                borderRadius: 5,
                            }}>
                                Khôi phục
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centerModal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '95%',
        height: '20%',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        padding: 5,
    },
})