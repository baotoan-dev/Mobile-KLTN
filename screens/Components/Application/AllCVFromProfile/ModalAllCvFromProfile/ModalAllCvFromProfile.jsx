import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import ListCvFromProfile from '../ListCvFromProfile/ListCvFromProfile';

export default function ModalAllCvFromProfile({
    showModalCvFromProfile,
    setShowModalCvFromProfile,
    profile
}) {
    return (
        <View>
            <Modal
                isVisible={showModalCvFromProfile}
                onBackdropPress={() => setShowModalCvFromProfile(false)}
                onSwipeComplete={() => setShowModalCvFromProfile(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '75%',
                    borderRadius: 10,
                }}>
                    <View style={{
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'gray',
                    }}>
                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginVertical: 20
                            }}>
                                Thông tin CV
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModalCvFromProfile(false)
                            }}
                        >
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 20,
                        backgroundColor: '#EEEEEE',
                        height: '100%'
                    }}>
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: 'gray',
                        }}>CV ONLINE</Text>
                        <View>
                            <ListCvFromProfile profile={profile} />
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
});