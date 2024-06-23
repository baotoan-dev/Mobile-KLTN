import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderOfScreen from '../../HeaderOfScreen/HeaderOfScreen'
import ContentComponent from './ContentComponent/ContentComponent'
import { useState, useEffect } from 'react'
import { communityApi } from '../../../../api/community/communityApi'
import { useDispatch } from 'react-redux'
import { getCommunitiesAction } from '../../../../redux/store/Community/communitySlice'
import Toast from 'react-native-toast-message'
import { getAllCommunityOfProileAction } from '../../../../redux/store/CommunityProfile/GetAllCommunitOfProile/getAllCommunitOfProileSlice'
import { useNavigation } from '@react-navigation/native'
import { getProfileAnalyticsAction } from '../../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice'

export default function CreateBlogComponent(prop) {
    const { type, data } = prop.route.params
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])
    const [deleteImages, setDeleteImages] = useState([])

    useEffect(() => {
        if (type === 'edit') {
            setTitle(data.title)
            setContent(data.content)
            setImages(data.imageData && data.imageData.length > 0 ? [{
                uri: data.imageData[0].image,
                name: 'image',
                type: 'image/*',
                id: data.imageData[0].id
            }] : [])
        }
    }, [])


    const handlePostBlog = async () => {
        const formData = new FormData()

        formData.append('title', title)
        formData.append('content', content)

        images.forEach(
            (image, index) => {
                formData.append(`images`, {
                    uri: image.uri,
                    name: image.name,
                    type: image.type
                })
            }
        )

        const res = await communityApi.createCommunity(formData)


        if (res && res.data && res.data.status === 201) {
            Toast.show({
                type: 'success',
                text1: 'Tạo bài blog thành công',
                position: 'top',
                visibilityTime: 2000,
                topOffset: 100,
            });
            setTitle('')
            setContent('')
            setImages([])
            dispatch(getCommunitiesAction(
                0, 5, 'cm', 0, 'vi'
            ))
            dispatch(getProfileAnalyticsAction());
        }
    }

    const handleEditBlog = async () => {
        const formData = new FormData()

        formData.append('title', title)
        formData.append('content', content)
        deleteImages && formData.append('deleteImages', [deleteImages])
        images.length > 0 && images.forEach(
            (image, index) => {
                if (!image.id) {
                    formData.append(`images`, {
                        uri: image.uri,
                        name: image.name,
                        type: image.type
                    })
                }
            }
        )

        const res = await communityApi.updateCommunity(formData, data.id)

        if (res && res.data.status === 200) {
            dispatch(getAllCommunityOfProileAction(0, 10, 'v'))
            Toast.show({
                type: 'success',
                text1: 'Cập nhật bài blog thành công',
                position: 'top',
                visibilityTime: 2000,
                topOffset: 100,
            });
            setTimeout(() => {
                navigation.goBack()
            }, 2000)
        }
    }

    return (
        <View style={{
            backgroundColor: 'white',
            height: '100%'
        }}>
            <HeaderOfScreen title="Tạo bài Blog" />
            <ContentComponent
                setTitle={setTitle}
                setContent={setContent}
                images={images}
                setImages={setImages}
                title={title}
                content={content}
                type={type}
                setDeleteImages={setDeleteImages}
            />
            <TouchableOpacity
                onPress={() => {
                    if (type === 'edit') {
                        handleEditBlog()
                    }
                    else {
                        handlePostBlog()
                    }
                }}
                style={styles.buttonPost}>
                <Text>
                    {
                        type === 'edit' ? 'Cập nhật' : 'Đăng bài'
                    }
                </Text>
            </TouchableOpacity>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonPost: {
        backgroundColor: '#A3D8FF',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center'
    }
})