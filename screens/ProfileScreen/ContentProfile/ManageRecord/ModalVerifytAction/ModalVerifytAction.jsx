import { View, Text, StyleSheet, TouchableOpacity, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal'
import { MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';

export default function ModalVerifytAction({
    setShowModalSearch,
    showModalSearch,
    profile,
    handleEnableSearch,
    setCvIds,
    cvIds,
    checkedItems,
    setCheckedItems
}) {
    const [cvList, setCvList] = React.useState([])
    const toggleCheckbox = (itemId) => {
        setCheckedItems({
            ...checkedItems,
            [itemId]: !checkedItems[itemId]
        });
    };

    const handleOpenModal = () => {
        setShowModalSearch(false)
    }

    useEffect(() => {
        if (profile && profile.profilesCvs) {
            const list = profile.profilesCvs.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    checked: item.isPublic,
                }

            })
            setCvList(list)
        }
    }, [profile])

    useEffect(() => {
        const list = cvList.filter((item) => checkedItems[item.id])
        const ids = list.map((item) => item.id)
        setCvIds(ids)
    }, [checkedItems])

    return (
        <View>
            <Modal
                isVisible={showModalSearch}
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
                    height: '70%',
                    borderRadius: 5,
                }}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.textHeader}>
                                Vui lòng lựa chọn các CV
                            </Text>
                            <Text style={styles.textHeader}>
                                bạn muốn bật tìm việc
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleOpenModal()}
                        >
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}>
                            CV Online
                        </Text>
                        <FlatList
                            data={cvList}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <View style={
                                        {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }
                                    }>
                                        <CheckBox
                                            checked={checkedItems[item.id]}
                                            onPress={() => toggleCheckbox(item.id)}
                                            iconType="material-community"
                                            checkedIcon="checkbox-outline"
                                            uncheckedIcon={'checkbox-blank-outline'}
                                        />
                                        <Text>
                                            {item.name}
                                        </Text>
                                    </View>
                                )
                            }}
                        />
                    </View>
                    <Text style={styles.extraInfor}>
                        Khi bật tìm việc, hệ thống sẽ tự động tìm việc cho bạn dựa trên CV bạn đã chọn
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            handleEnableSearch()
                        }}
                        style={[styles.buttonSearch, {
                            backgroundColor: cvIds.length > 0 ? '#41C9E2' : 'gray',
                        }]}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                        }}>
                            Bật tìm việc ngay
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        backgroundColor: '#41C9E2',
        alignItems: 'center',
    },
    textHeader: {
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        height: '60%',
        borderWidth: 0.5,
        borderColor: 'gray',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
    },
    extraInfor: {
        paddingHorizontal: 20,
        marginTop: 10,
        fontStyle: 'italic',
        color: 'gray',
    },
    buttonSearch: {
        padding: 10,
        borderRadius: 5,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
        textAlign: 'center',
        marginTop: 20,
    }
});