import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesAction } from '../../../../../redux/store/Categories/categoriesSlice'
import { AntDesign } from '@expo/vector-icons';
import { LENGTH_JOB_EXPECT } from '../../../../../utils/LengthLocationAndCategory';
export default function ListJobExpect({ search, setListJobExpectParent, listJobExpectParent }) {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)
    const [listChild, setListChild] = React.useState([])

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            'Bạn đã chọn quá số lượng cho phép',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    React.useEffect(() => {
        dispatch(getCategoriesAction(search))
    }, [search])

    useEffect(() => {
        let updateChild = []
        if (categories.length > 0) {
            const listChild = categories.map((item) => {
                return item.childs
            })
            listChild.map((item) => {
                return item.map((item) => {
                    updateChild.push(item)
                })
            })
            // remove duplicate
            updateChild = updateChild.filter((item, index, self) =>
                index === self.findIndex((t) => (
                    t.name === item.name
                ))
            )
            setListChild(updateChild)
        }
    }, [categories])


    return (
        <View style={{
            paddingHorizontal: 10,
        }}>
            <FlatList
                data={listChild}
                renderItem={({ item }) => (
                    <View style={{
                        borderBottomColor: 'gray',
                        marginLeft: 10,
                        padding: 5,
                        borderRadius: 5,
                        borderBottomWidth: 0.2,
                        paddingVertical: 10,
                    }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                            onPress={() => {
                                if (listJobExpectParent.find(job => job.id === item.id)) {
                                    setListJobExpectParent(listJobExpectParent.filter(job => job.id !== item.id))
                                    return
                                }
                                if (listJobExpectParent.length < LENGTH_JOB_EXPECT) {
                                    setListJobExpectParent([...listJobExpectParent, item])
                                    return
                                }

                                if (listJobExpectParent.length === LENGTH_JOB_EXPECT) {
                                    showToastWithGravity()
                                    return
                                }
                            }}>
                            <Text>{item.name}</Text>
                            {
                                listJobExpectParent.find(
                                    job => job.id === item.id
                                ) && <Text style={{
                                    color: 'blue',
                                }}><AntDesign name="check" size={24} color="blue" /></Text>
                            }
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}