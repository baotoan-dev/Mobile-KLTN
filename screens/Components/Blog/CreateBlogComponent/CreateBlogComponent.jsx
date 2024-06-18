import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import HeaderOfScreen from '../../HeaderOfScreen/HeaderOfScreen'
import ContentComponent from './ContentComponent/ContentComponent'
import { useState, useEffect } from 'react'
import { communityApi } from '../../../../api/community/communityApi'
import { useDispatch } from 'react-redux'
import { getCommunitiesAction } from '../../../../redux/store/Community/communitySlice'

export default function CreateBlogComponent() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [images, setImages] = useState([])

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