import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ModalShowHideCV from '../ModalShowHideCV/ModalShowHideCV';

export default function ModalActionCv({
  showModalActionCv,
  setShowModalActionCv,
  nameCv,
  statusCv
}) {
  const [modalShowHideCv, setModalShowHideCv] = React.useState(false)
  return (
    <View>
      <Modal
        isVisible={showModalActionCv}
        onBackdropPress={() => setShowModalActionCv(false)}
        onSwipeComplete={() => setShowModalActionCv(false)}
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
          <View style={styles.header}>
            <View style={{
              flex: 1,
              alignItems: 'center'
            }}>
              <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
              }}>{nameCv}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowModalActionCv(false);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <MaterialIcons name="cancel" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{
            paddingHorizontal: 20,
            backgroundColor: '#EEEEEE',
            height: '100%',
            paddingTop: 20,
          }}>
            <View style={styles.itemContainer}>
              <TouchableOpacity style={styles.item}>
                <AntDesign name="eyeo" size={20} color="black" />
                <Text style={styles.ml}>Xem</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <AntDesign name="edit" size={20} color="black" />
                <Text style={styles.ml}>Chỉnh sửa</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.itemContainer]}>
              <TouchableOpacity style={styles.item}>
                <AntDesign name="download" size={20} color="black" />
                <Text style={styles.ml}>Tải xuống</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.item, {
                justifyContent: 'space-between'
              }]}>
                <View style={{
                  flexDirection: 'row',
                }}>
                  <AntDesign name="pushpino" size={20} color="black" />
                  <Text style={styles.ml}>Hiện CV</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setModalShowHideCv(true)
                    setShowModalActionCv(false)
                  }}
                >
                  <AntDesign name="exclamationcircleo" size={20} color="black" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
              <TouchableOpacity style={styles.item}>
                <AntDesign name="delete" size={20} color="red" />
                <Text style={[styles.ml, {
                  color: 'red'
                }]}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {
        modalShowHideCv &&
        <ModalShowHideCV
          modalShowHideCv={modalShowHideCv}
          setModalShowHideCv={setModalShowHideCv}
          statusCv={statusCv}
        />
      }
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: '#EEEEEE',
  },
  ml: {
    marginLeft: 10,
    fontSize: 14,
    color: 'black',
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
  },
})

