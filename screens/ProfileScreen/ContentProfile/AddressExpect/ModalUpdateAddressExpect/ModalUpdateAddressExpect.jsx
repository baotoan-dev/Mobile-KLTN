import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';

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
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
            <View>
              <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                padding: 10,
              }}>Chọn vị trí công việc</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleOpenModal()}
            >
              <MaterialIcons name="cancel" size={24} color="black" />
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
});