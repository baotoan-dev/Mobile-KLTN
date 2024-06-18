import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderOfScreen from '../../HeaderOfScreen/HeaderOfScreen'
import ContentComponent from './ContentComponent/ContentComponent'
import { useState, useEffect } from 'react'
import { communityApi } from '../../../../api/community/communityApi'
import { useDispatch } from 'react-redux'
import { getCommunitiesAction } from '../../../../redux/store/Community/communitySlice'
import Toast from 'react-native-toast-message'

export default function CreateBlogComponent(prop) {
    const { type, data } = prop.route.params
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])


    useEffect(() => {
        if (type === 'edit') {
            setTitle(data.title)
            setContent(data.content)
            setImages(data.imageData[0].image)
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
            />
            <TouchableOpacity
                onPress={() => {
                    handlePostBlog()
                }}
                style={styles.buttonPost}>
                <Text>
                    Đăng tải
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