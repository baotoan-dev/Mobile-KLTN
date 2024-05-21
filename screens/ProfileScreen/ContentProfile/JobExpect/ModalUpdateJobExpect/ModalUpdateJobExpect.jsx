import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import ListJobExpect from '../ListJobExpect/ListJobExpect';
import { LENGTH_JOB_EXPECT } from '../../../../../utils/LengthLocationAndCategory';
import { useDispatch } from 'react-redux';
import { updateProfileCategoriesAction } from '../../../../../redux/store/Profile/ProfileCategories/Update/updateProfileCategories';
import { getProfileAction } from '../../../../../redux/store/Profile/profileSilce';
import Entypo from '@expo/vector-icons/Entypo';

export default function ModalUpdateJobExpect({
    isOpenModal, handleOpenModal, profile
}) {
    const [search, setSearch] = React.useState('')
    const dispatch = useDispatch()
    const [listJobExpectParent, setListJobExpectParent] = React.useState([])

    useEffect(() => {
        if (profile && profile?.profileCategories?.length > 0) {
            setListJobExpectParent(profile?.profileCategories.map((item) => {
                return {
                    id: item.id,
                    name: item.fullName,
                }
            }
            ))
        }
    }, [profile])

    const handleUpdateJobExpect = () => {
        try {
            const data = {
                categoryIds: listJobExpectParent.map((item) => item.id),
            }
            dispatch(updateProfileCategoriesAction(data))
            dispatch(getProfileAction('vi'))
            handleOpenModal()
        } catch (error) {
            throw error
        }
    }

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
                            }}>Chọn ngành nghề</Text>
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
                                LENGTH_JOB_EXPECT - listJobExpectParent.length > 0 ? `Bạn còn ${LENGTH_JOB_EXPECT - listJobExpectParent.length} lựa chọn` : 'Bạn đã chọn đủ số lượng cho phép'
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
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        paddingHorizontal: 20,
                    }}>
                        {
                            listJobExpectParent && listJobExpectParent?.length > 0 ? listJobExpectParent?.map((item, index) => {
                                return (
                                    <View style={{
                                        alignSelf: 'flex-start',
                                        borderWidth: 0.5,
                                        borderRadius: 5,
                                        backgroundColor: 'white',
                                        margin: 5,
                                        marginTop: 10,
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: 5,
                                            borderRadius: 5,
                                            borderColor: '#242670',
                                        }}>
                                            <Text>{item.name}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setListJobExpectParent(listJobExpectParent.filter((job) => job.id !== item.id))
                                                }}
                                            >
                                                <Entypo name="cross" size={24} color="#242670" />
                                            </TouchableOpacity>
                                        </View>
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
                    <View
                        style={{
                            height: '70%',
                        }}
                    >
                        <ListJobExpect search={search} setListJobExpectParent={setListJobExpectParent} listJobExpectParent={listJobExpectParent} />
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        handleUpdateJobExpect()
                    }}
                    style={{
                        backgroundColor: 'white',
                        width: '100%',
                        height: 50,
                    }}>
                    <Text style={{
                        textAlign: 'center',
                        padding: 10,
                        backgroundColor: '#242670',
                        color: 'white',
                        borderRadius: 10,
                        marginHorizontal: 20,
                        marginBottom: 10,
                        position: 'absolute',
                        bottom: 0,
                        width: '90%',
                        alignSelf: 'center',
                    }}>
                        Xác nhận
                    </Text>
                </TouchableOpacity>
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