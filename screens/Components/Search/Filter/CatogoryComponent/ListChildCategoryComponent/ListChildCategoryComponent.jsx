import { View, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LENGTH_CATEGORY } from '../../../../../../utils/LengthLocationAndCategory';

export default function ListChildCategoryComponent({
    categories,
    setOnClickItem,
    setShowModalCategory,
    dataCategoryFilter,
    setDataCategoryFilter
}) {
    const [search, setSearch] = React.useState('')
    const [childCategories, setChildCategories] = React.useState([])

    useEffect(() => {
        setChildCategories(categories[0].childs)
    }, [])

    useEffect(() => {
        if (search) {
            const filterChildCategories = categories[0].childs.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase())
            })
            setChildCategories(filterChildCategories)
        } else {
            setChildCategories(categories[0].childs)
        }
    }, [search])

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'Bạn đã chọn quá số lượng cho phép',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    return (
        <SafeAreaView>
            <View style={{
                marginVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => {
                        setOnClickItem(false)
                    }}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{
                        marginLeft: 5
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>Chọn ngành nghề</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {
                    setShowModalCategory(false)
                }}>
                    <MaterialIcons name="cancel" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View
                    style={{
                        padding: 5,
                        borderWidth: 0.5,
                        borderColor: 'black',
                        borderRadius: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <EvilIcons name="search" size={24} color="black" />
                    <TextInput
                        onChangeText={(text) => setSearch(text)}
                        placeholder="Tìm kiếm ngành nghề"></TextInput>
                </View>
                <FlatList
                    data={childCategories}
                    style={{
                        marginTop: 10,
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                if (dataCategoryFilter && dataCategoryFilter.length > 0 && dataCategoryFilter.some((categories) => categories.id === item.id)) {
                                    setDataCategoryFilter(dataCategoryFilter.filter((categories) => {
                                        return categories.id !== item.id
                                    }))
                                    return;
                                }

                                if (dataCategoryFilter && dataCategoryFilter.length === LENGTH_CATEGORY) {
                                    showToastWithGravity()
                                    return;
                                }

                                setDataCategoryFilter([
                                    ...dataCategoryFilter,
                                    {
                                        id: item.id,
                                        name: item.name
                                    }
                                ])
                            }}
                            style={{
                                padding: 10,
                                borderBottomWidth: 0.5,
                                borderBottomColor: 'gray',
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <Text>{item.name}</Text>
                                {
                                    dataCategoryFilter && dataCategoryFilter.length > 0 && dataCategoryFilter.find((categories) => categories.id === item.id)
                                    &&
                                    (
                                        <View>
                                            <Ionicons name="checkmark" size={24} color="blue" />
                                        </View>
                                    )
                                }
                            </View>

                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    )
}