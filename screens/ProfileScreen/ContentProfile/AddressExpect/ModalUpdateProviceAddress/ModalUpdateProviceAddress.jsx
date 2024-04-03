import { View, Text, TouchableOpacity, TextInput, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ModalUpdateProviceAddress({
    handleOpenModal,
    listAddressExpect,
    LENGTH_ADD_EXPECT,
    setIsCheckClick,
    setListAddressExpect,
    idParent,
    location,

}) {
    const [search, setSearch] = React.useState('')
    const [listChild, setListChild] = React.useState([])
    const [isChildSearch, setIsChildSearch] = React.useState(false)
    const [listChildOfSearch, setListChildOfSearch] = React.useState([])

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'Bạn đã chọn quá số lượng cho phép',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };


    useEffect(() => {
        location.filter((item) => {
            if (item.province_id === idParent) {
                setListChild(item)
            }
        })
    }, [idParent])

    useEffect(() => {
        if (search.length > 0) {
            setIsChildSearch(true)
            setListChildOfSearch(listChild.districts.filter((item) => {
                return item.district.toLowerCase().includes(search.toLowerCase())
            }))
        } else {
            setIsChildSearch(false)
        }
    }, [search])

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
            }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                }}>
                    <TouchableOpacity onPress={() => {
                        setIsCheckClick(false)
                    }}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        marginLeft: 10,
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
                    marginTop: 10,
                    height: '60%',
                }}
                data={!isChildSearch ? listChild.districts : listChildOfSearch}
                keyExtractor={(item) => item.district_id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            borderRadius: 10,
                            borderBottomColor: 'gray',
                            borderBottomWidth: 0.5,
                            marginHorizontal: 20,
                            marginTop: 10,
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    if (listAddressExpect.find(location => location.district_id === item.district_id)) {
                                        setListAddressExpect(listAddressExpect.filter(location => location.district_id !== item.district_id))
                                        return
                                    }
                                    if (listAddressExpect.length < LENGTH_ADD_EXPECT) {
                                        setListAddressExpect([...listAddressExpect, item])
                                        return
                                    }

                                    if (listAddressExpect.length === LENGTH_ADD_EXPECT) {
                                        showToastWithGravity()
                                        return
                                    }
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        padding: 10,
                                    }}>{item.district}</Text>

                                    {
                                        listAddressExpect.find(location => location.district_id === item.district_id) && <MaterialIcons name="check" size={24} color="blue" />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}