import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ModalShowHideCV from '../ModalShowHideCV/ModalShowHideCV';
import { useNavigation } from '@react-navigation/native';
import { profileCVsApi } from '../../../api/profile/profileCVs/profileCVsApi';
import { useDispatch } from 'react-redux';
import { getProfileAction } from '../../../redux/store/Profile/profileSilce';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';
import { CheckLengthTitle } from '../../../utils/CheckLengthTitle';
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing'
import Toast from 'react-native-toast-message';

export default function ModalActionCv({
  showModalActionCv,
  setShowModalActionCv,
  nameCv,
  statusCv,
  idCV,
  profile,
  typeCv,
  linkCv
}) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [modalShowHideCv, setModalShowHideCv] = React.useState(false)
  const [showModalConfirmDelete, setShowModalConfirmDelete] = React.useState(false)
  const [listCv, setListCv] = React.useState([])
  const [linkPDFOfCV, setLinkPDFOfCV] = React.useState('')

  useEffect(() => {
    if (profile) {
      setListCv(profile.profilesCvs)
    }
  }, [profile])

  const handleShowOrHideCV = async (id) => {
    try {
      const res = await profileCVsApi.pushTopCv(id)

      if (res && res.data.statusCode === 200) {
        dispatch(getProfileAction('vi'))
        setShowModalActionCv(false)
      }

    } catch (error) {
      throw error;
    }
  }

  const handleDeleteCv = async () => {
    const res = await profileCVsApi.deleteCvs([idCV])

    if (res && res.data.statusCode === 200) {
      dispatch(getProfileAction('vi'))
      setShowModalActionCv(false)
    }
  }

  const handleEditCv = () => {
    if (listCv) {
      let cvIndex = 0
      let templateId = 0
      let nameCv = ''
      listCv.forEach((item) => {
        if (item.id === idCV) {
          cvIndex = item.cvIndex
          templateId = item.templateId
          nameCv = item.name
        }
      })

      navigation.navigate('PDFScreen',
        {
          templateId: templateId,
          typeAction: 'edit',
          cvIndexParent: cvIndex,
          nameCvParent: nameCv,
        })
    }
  }

  const downloadPDF = async (url) => {
    const uri = url
    const fileUri = FileSystem.cacheDirectory + 'cv.pdf'
    const options = { from: uri, to: fileUri }
    await FileSystem.downloadAsync(uri, fileUri)
    await shareAsync(fileUri)
  };


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
          height: '45%',
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
              }}>{CheckLengthTitle(nameCv)}</Text>
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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SeenPDF', {
                    id: idCV,
                  })
                }}
                style={styles.item}>
                <AntDesign name="eyeo" size={20} color="black" />
                <Text style={styles.ml}>Xem</Text>
              </TouchableOpacity>
              {
                typeCv === 0 &&
                <TouchableOpacity
                  onPress={() => {
                    handleEditCv()
                  }}
                  style={styles.item}>
                  <AntDesign name="edit" size={20} color="black" />
                  <Text style={styles.ml}>Chỉnh sửa</Text>
                </TouchableOpacity>
              }
            </View>
            <View style={[styles.itemContainer]}>
              <TouchableOpacity
                onPress={() => {
                  downloadPDF(linkCv)
                  setShowModalActionCv(false)
                  Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Tải xuống CV thành công',
                  });
                }}
                style={styles.item}>
                <AntDesign name="download" size={20} color="black" />
                <Text style={styles.ml}>Tải xuống</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleShowOrHideCV(idCV)
                }}
                style={[styles.item, {
                  justifyContent: 'space-between'
                }]}>
                <View style={{
                  flexDirection: 'row',
                }}>
                  <AntDesign name="pushpino" size={20} color="black" />
                  <Text style={styles.ml}>{
                    statusCv === 1 ? 'Ẩn CV' : 'Hiện CV'
                  }</Text>
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
              <TouchableOpacity
                onPress={() => {
                  setShowModalActionCv(false)
                  navigation.navigate('AIJobForCvScreen')
                }}
                style={styles.item}>
                <AntDesign name="table" size={20} color="black" />
                <Text style={[styles.ml, {
                  color: 'black'
                }]}>Xem công việc</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemContainer}>
              <TouchableOpacity
                onPress={() => {
                  setShowModalConfirmDelete(true)
                  setShowModalActionCv(false)
                }}
                style={styles.item}>
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
      {
        showModalConfirmDelete &&
        <ModalConfirmDelete
          showModalConfirmDelete={showModalConfirmDelete}
          setShowModalConfirmDelete={setShowModalConfirmDelete}
          handleDeleteCv={handleDeleteCv}
        />
      }
      <Toast ref={(ref) => Toast.setRef(ref)} />
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

