import { View, Text, SafeAreaView, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import ListChildCategoryComponent from '../ListChildCategoryComponent/ListChildCategoryComponent';
import { EvilIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { categoriesApi } from '../../../../../../api/categories/categoriesApi';
import { MaterialIcons } from '@expo/vector-icons';

export default function ListCategoryComponent({
    setShowModalCategory,
    dataCategoryFilter,
    setDataCategoryFilter
}) {
    const [onClickItem, setOnClickItem] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState('')

    const fetchDataCategory = async () => {
        const res = await categoriesApi.getCategories('vi', search ? search : '')

        if (res && res.data.code) {
            setCategories(res.data.data)
        }
    }

    useEffect(() => {
        fetchDataCategory()
    }, [search])

    return (
        <SafeAreaView>
            {
                onClickItem === false ?
                    (
                        <View>
                            <View style={{
                                marginVertical: 15,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                            }}>
                                <View>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                    }}>Chọn ngành nghề</Text>
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
                                    data={categories}
                                    keyExtractor={(item) => item.parent_category_id.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                setOnClickItem(true)
                                                setId(item.parent_category_id)
                                            }}
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: 10,
                                                borderBottomWidth: 0.5,
                                                borderBottomColor: 'gray',
                                            }}>
                                            <Text>{item.parent_category}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </ScrollView>
                        </View>

                    )
                    :
                    (
                        <ListChildCategoryComponent dataCategoryFilter={dataCategoryFilter} setDataCategoryFilter={setDataCategoryFilter} setShowModalCategory={setShowModalCategory} setOnClickItem={setOnClickItem} categories={categories.filter((item) => { return item.parent_category_id === id })} />
                    )
            }

        </SafeAreaView>
    )
}