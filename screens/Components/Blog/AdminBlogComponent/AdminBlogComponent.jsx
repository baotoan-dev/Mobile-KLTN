import { View, Text } from 'react-native'
import React from 'react'
import HeadingSeeMore from '../HeadingSeeMore/HeadingSeeMore'
import ListBlogComponent from '../ListBlogComponent/ListBlogComponent'

export default function AdminBlogComponent() {
    return (
        <View style={{
            padding: 20,
        }}>
            <HeadingSeeMore left="Chia sẻ từ trang" right="Xem thêm" />
            <ListBlogComponent />
        </View>
    )
}