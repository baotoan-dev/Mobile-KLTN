import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, FlatList, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getLocationAction } from '../../../../../../redux/store/Location/locationSlice';

export default function ListProvinceComponent({
    setIsCheckClickProvince,
    setShowModalLocation,
    setIdProvince,
}) {
    const dispatch = useDispatch()
    const location = useSelector((state) => state.location.location)
    const [search, setSearch] = React.useState('')

    useEffect(() => {
        dispatch(getLocationAction(search))
    }, [search])

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
                marginTop: 10,
            }}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                }}>Chọn tỉnh thành</Text>
                <TouchableOpacity onPress={() => {
                    setShowModalLocation(false)
                }}>
                    <MaterialIcons name="cancel" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 10,
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <EvilIcons name="search" size={24} color="black" />
                <TextInput
                    onChangeText={(text) => {
                        setSearch(text)
                    }}
                    placeholder="Tìm kiếm tỉnh thành"
                >

                </TextInput>
            </View>
            <View style={{
                marginBottom: 50,
            }}>
                <SafeAreaView>
                    <ScrollView>
                        <FlatList
                            style={{
                                marginTop: 10,
                            }}
                            data={location}
                            keyExtractor={(item) => item.province_id}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => {
                                    setIsCheckClickProvince(true)
                                    setIdProvince(item.province_id)
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingVertical: 10,
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: 'gray',
                                    }}>
                                        <Text>{item.province_name}</Text>
                                        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                                    </View>
                                </TouchableOpacity>
                            )}
                        >
                        </FlatList>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </View>
    )
}