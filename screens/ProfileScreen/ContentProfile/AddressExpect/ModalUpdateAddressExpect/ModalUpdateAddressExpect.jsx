import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getLocationAction } from '../../../../../redux/store/Location/locationSlice';
import { LENGTH_ADD_EXPECT } from '../../../../../utils/LengthLocationAndCategory';
import { EvilIcons } from '@expo/vector-icons';
import ModalUpdateProviceAddress from '../ModalUpdateProviceAddress/ModalUpdateProviceAddress';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { updateProfileLocationsAction } from '../../../../../redux/store/Profile/ProfileLocations/Update/updateProfileLocations';
import { getProfileAction } from '../../../../../redux/store/Profile/profileSilce';

export default function ModalUpdateAddressExpect({
  isOpenModal,
  handleOpenModal,
  listAddressExpect,
  setListAddressExpect
}) {
  const dispatch = useDispatch()
  const location = useSelector(state => state.location.location)
  const [search, setSearch] = useState('');
  const [isCheckClick, setIsCheckClick] = useState(false);
  const [idParent, setIdParent] = useState(null);

  const handleUpdateAddressExpect = () => {
    dispatch(updateProfileLocationsAction({
      locationIds: listAddressExpect.map((item) => item.district_id),
    }))
    dispatch(getProfileAction('vi'))
    handleOpenModal()

  }

  useEffect(() => {
    dispatch(getLocationAction(search))
  }, [search]);

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
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
          {!isCheckClick ? (
            <View>
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
              <View style={{
                paddingHorizontal: 20,
              }}>
                <Text style={{
                  fontSize: 12,
                  color: 'gray',
                }}>
                  {
                    LENGTH_ADD_EXPECT - listAddressExpect.length > 0 ? `Bạn còn ${LENGTH_ADD_EXPECT - listAddressExpect.length} lựa chọn` : 'Bạn đã chọn đủ số lượng cho phép'
                  }
                </Text>
              </View>

              <View
                style={{
                  padding: 5,
                  borderWidth: 0.5,
                  borderColor: 'black',
                  marginTop: 10,
                  borderRadius: 10,
                  marginHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <EvilIcons name="search" size={24} color="black" />
                <TextInput
                  onChangeText={(text) => setSearch(text)}
                  placeholder="Tìm kiếm ngành nghề"></TextInput>
              </View>
              {
                listAddressExpect && listAddressExpect?.length > 0 && (
                  <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingHorizontal: 10,
                  }}>
                    {
                      listAddressExpect && listAddressExpect?.length > 0 ? listAddressExpect?.map((item, index) => {
                        return (
                          <View style={{
                            alignSelf: 'flex-start',
                            borderWidth: 0.5,
                            borderRadius: 10,
                            marginLeft: 10,
                            padding: 5,
                            backgroundColor: 'white',
                            marginTop: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                            <Text>{item.district}</Text>
                            <TouchableOpacity onPress={() => {
                              setListAddressExpect(listAddressExpect.filter(location => location.district_id !== item.district_id))
                            }}>
                              <MaterialCommunityIcons name="delete-empty-outline" size={24} color="black" />
                            </TouchableOpacity>
                          </View>
                        )
                      }
                      ) : <View>
                        <Text style={{
                          fontWeight: 'bold',
                          color: 'blue',
                        }}></Text>
                      </View>
                    }
                  </View>
                )
              }
              <FlatList
                style={{
                  paddingHorizontal: 15,
                }}
                data={location}
                keyExtractor={(item, index) => item.province_id.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setIdParent(item.province_id);
                        setIsCheckClick(true);
                      }}
                    >
                      <View style={{
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'gray',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <Text>{item.province_name}</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
            </View>
          ) : (
            <ModalUpdateProviceAddress
              handleOpenModal={handleOpenModal}
              listAddressExpect={listAddressExpect}
              LENGTH_ADD_EXPECT={LENGTH_ADD_EXPECT}
              setIsCheckClick={setIsCheckClick}
              idParent={idParent}
              location={location}
              setListAddressExpect={setListAddressExpect}
            />
          )}
        </View>
        <View style={{
          width: '100%',
          height: 50,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            onPress={() => {
              handleUpdateAddressExpect()
            }}
            style={{
              position: 'absolute',
              bottom: 10,
              padding: 10,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >  
          <Text style={{
            fontWeight: 'bold',
            padding: 10,
            width: '80%',
            borderRadius: 10,
            color: 'white',
            backgroundColor: 'blue',
            textAlign: 'center',
          }}>
              Xác nhận
            </Text>
          </TouchableOpacity>
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
    alignItems: 'center',
  },
});