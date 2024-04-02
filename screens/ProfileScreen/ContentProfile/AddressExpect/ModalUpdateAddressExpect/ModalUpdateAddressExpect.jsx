import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';

export default function ModalUpdateAddressExpect({
  isOpenModal, handleOpenModal
}) {
  return (
    <View>
      <Modal
        isVisible={isOpenModal}
        onBackdropPress={() => handleOpenModal()}
        onSwipeComplete={() => handleOpenModal()}
        swipeDirection={['down']}
        animationIn={"bounceInUp"}
        animationOut={"bounceOutDown"}
        style={styles.bottomModal}
      >
        <View style={{
          backgroundColor: 'white',
          width: '100%',
          height: '80%',
          borderRadius: 10,
        }}>
          <Text>ModalUpdateAddressExpect</Text>
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