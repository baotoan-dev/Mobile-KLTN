import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { updatedDataMoney } from './data/data';
import Modal from 'react-native-modal';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSearchAction } from '../../../../../redux/store/Search/searchSlice';
import { useDispatch } from 'react-redux';

export default function MoneyComponent({
    showModalMoney,
    setShowModalMoney,
    setDataMoneyFilter,
    dataMoneyFilter,
    isCheckClickType,
    type,
}) {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            const data = await AsyncStorage.getItem('dataMoneyFilter')
            if (data) {
                setDataMoneyFilter(JSON.parse(data))
            }
        }
        fetchData()
    }, [])

    const handleSearchFromTop = async (salaryMin, salaryMax) => {
        dispatch(getSearchAction(
            '',
            0,
            null,
            null,
            null,
            null,
            salaryMin,
            salaryMax,
            null,
            null,
            [],
            [],
            [],
            null,
            'vi',
        ))
    }

    return (
        <View>
            <Modal
                isVisible={showModalMoney}
                onBackdropPress={() => setShowModalMoney(false)}
                onSwipeComplete={() => setShowModalMoney(false)}
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
                            setShowModalMoney(false)
                        }}>
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={updatedDataMoney}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={async () => {
                                    if (dataMoneyFilter.id === item.id) {
                                        setDataMoneyFilter({})
                                        return
                                    };

                                    setDataMoneyFilter({
                                        salaryMin: item.slaryMin,
                                        salaryMax: item.slaryMax,
                                        id: item.id,
                                    })
                                    await AsyncStorage.setItem('dataMoneyFilter', JSON.stringify({
                                        salaryMin: item.slaryMin,
                                        salaryMax: item.slaryMax,
                                        id: item.id,
                                    }))
                                    setShowModalMoney(false)
                                    if (type === true) {
                                        handleSearchFromTop(item.slaryMin, item.slaryMax)
                                    }
                                    if (isCheckClickType) {
                                        navigation.navigate('SearchResult');
                                    }
                                }}
                                style={{
                                    padding: 20,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#f0f0f0',
                                    backgroundColor: dataMoneyFilter.id === item.id ? '#f0f0f0' : 'white',
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                    <Text>
                                        {item.text}
                                    </Text>
                                    {
                                        +dataMoneyFilter.id == +item.id && <AntDesign name="check" size={24} color="blue" />
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