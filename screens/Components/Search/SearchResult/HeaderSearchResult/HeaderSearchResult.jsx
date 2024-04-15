import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import MoneyComponent from '../../Filter/MoneyComponent/MoneyComponent';
import TypeComponent from '../../Filter/TypeComponent/TypeComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HeaderSearchResult() {
    const navigation = useNavigation();
    const [q, setQ] = React.useState('')
    const [showModalSalary, setShowModalSalary] = React.useState(false)
    const [showModalType, setShowModalType] = React.useState(false)
    const [dataTypeFilter, setDataTypeFilter] = React.useState({})
    const [dataMoneyFilter, setDataMoneyFilter] = React.useState({})
    const [isCheckClickMoney, setIsCheckClickMoney] = React.useState(false)
    const [isCheckClickType, setIsCheckClickType] = React.useState(false)

    const dataFilter = [
        {
            title: 'Mức lương',
            id: 1,
        },
        {
            title: 'Loại hình',
            id: 2,
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            const data = await AsyncStorage.getItem('dataTypeFilter')
            if (data) {
                const data = JSON.parse(data)
                setDataTypeFilter(data)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data = await AsyncStorage.getItem('dataMoneyFilter')
            if (data) {
                setDataMoneyFilter(JSON.parse(data))
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const data = await AsyncStorage.getItem('keyword')
            if (data) {
                setQ(data)
            }
        }
        fetchData()
    }, [])

    return (
        <View style={{
            backgroundColor: 'white',
            paddingTop: 40,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginBottom: 10,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-sharp" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{
                    marginLeft: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                }}>Kết quả tìm kiếm</Text>
            </View>
            <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    backgroundColor: 'white',
                    borderWidth: 0.2,
                    marginHorizontal: 20,
                    padding: 6,
                    marginBottom: 10,
                }}>
                    <EvilIcons name="search" size={24} color="black" />
                    <TextInput
                        placeholder="Tìm kiếm"
                        value={q}
                    />
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 20,
                width: '100%',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '30%',
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Filter')}
                        style={{
                            borderWidth: 1,
                            padding: 5,
                            borderColor: 'gray',
                            borderRadius: 20,
                            marginRight: 10,
                        }}>
                        <AntDesign name="filter" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{
                        borderRightWidth: 1,
                        paddingRight: 10,
                        borderColor: 'gray',
                    }}>
                        <Text>Lọc</Text>
                    </View>
                </View>
                <View
                    style={{
                        width: '70%',
                    }}
                >
                    <FlatList
                        data={dataFilter}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.id === 1) {
                                        setShowModalSalary(true)
                                        setIsCheckClickMoney(true)
                                        return
                                    }
                                    setShowModalType(true)
                                    setIsCheckClickType(true)
                                }}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    padding: 5,
                                    borderRadius: 5,
                                    marginRight: 10,
                                    borderWidth: 0.2,
                                }}>
                                {
                                    (index === 1 && dataTypeFilter.id) && <Text>{dataTypeFilter.name}</Text>
                                }
                                {
                                    (index === 0 && dataMoneyFilter.id) && 
                                    <Text>
                                        {
                                            dataMoneyFilter.salaryMin === 0 && dataMoneyFilter.salaryMax === 0 ? 'Tất cả' : `${dataMoneyFilter.salaryMin / 1000000} - ${dataMoneyFilter.salaryMax / 1000000} triệu VNĐ`
                                        }
                                    </Text>
                                }
                                {
                                    (!dataMoneyFilter.id && index === 0) && <Text>Mức lương</Text>
                                }
                                {
                                    (!dataTypeFilter.id && index === 1) && <Text>Loại hình</Text>
                                }
                                <AntDesign name="caretdown" size={16} color="black" style={{
                                    marginLeft: 5,
                                }} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
            <TypeComponent
                showModalType={showModalType}
                setShowModalType={setShowModalType}
                dataTypeFilter={dataTypeFilter}
                setDataTypeFilter={setDataTypeFilter}
                isCheckClickMoney={isCheckClickMoney}
            />
            <MoneyComponent
                showModalMoney={showModalSalary}
                setShowModalMoney={setShowModalSalary}
                dataMoneyFilter={dataMoneyFilter}
                setDataMoneyFilter={setDataMoneyFilter}
                isCheckClickType={isCheckClickType}
            />
        </View>
    )
}