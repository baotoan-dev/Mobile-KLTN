import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';

export default function ModalAddCv({
    showModalAddCv,
    setShowModalAddCv
}) {
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
        height: '25%',
        borderRadius: 10,
    }
})
