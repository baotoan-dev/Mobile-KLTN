import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { jobTypeApi } from '../../../../../api/job-type/jobTypeApi';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { getSearchAction } from '../../../../../redux/store/Search/searchSlice';

export default function TypeComponent({ type, showModalType, setShowModalType, setDataTypeFilter, dataTypeFilter, isCheckClickMoney }) {
    const [jobType, setJobType] = React.useState([])
    const dispatch = useDispatch()
    const fetchData = async () => {
        const res = await jobTypeApi.getJobType('vi')
        if (res && res.code === 200) {
            setJobType(res.data)
        }
        setJobType(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data = await AsyncStorage.getItem('dataTypeFilter')
            if (data) {
                const data = JSON.parse(data)
                setDataTypeFilter(data)
            }
        }
        fetchData()
    }, [])

    const handleSearchFromTop = async () => {
        dispatch(getSearchAction(
            '',
            0,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            [dataTypeFilter.id],
            [],
            [],
            null,
            'vi',
        ))
    }

    return (
        <View>
            <Modal
                isVisible={showModalType}
                onBackdropPress={() => setShowModalType(false)}
                onSwipeComplete={() => setShowModalType(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '50%',
                    borderRadius: 10,
                }}>
                    <View style={{
                        padding: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignContent: 'center',
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>
                            Loại công việc
                        </Text>
                        <TouchableOpacity onPress={() => {
                            setShowModalType(false)
                        }}>
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={jobType}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={async () => {
                                    if (item.id === dataTypeFilter.id) {
                                        setDataTypeFilter({})
                                        return
                                    }
                                    setShowModalType(false)
                                    setDataTypeFilter({
                                        id: item.id,
                                        name: item.name
                                    })
                                    await AsyncStorage.setItem('dataTypeFilter', JSON.stringify({
                                        id: item.id,
                                        name: item.name
                                    }))
                                    if (type === true) {
                                        handleSearchFromTop()
                                    }
                                }}
                                style={{
                                    padding: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#f0f0f0',
                                    backgroundColor: dataTypeFilter.id === item.id ? '#f0f0f0' : 'white',
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text>
                                        {item.name}
                                    </Text>
                                    {
                                        +dataTypeFilter.id == +item.id && <AntDesign name="check" size={24} color="blue" />
                                    }
                                </View>
                            </TouchableOpacity>
                        )}
                    />
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