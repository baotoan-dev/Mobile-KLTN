import { View, Text } from 'react-native'
import React from 'react'
import HeadingSeeMore from '../HeadingSeeMore/HeadingSeeMore'
import ListBlogComponent from '../ListBlogComponent/ListBlogComponent'

export default function UserBlogComponent() {
    return (
        <View style={{
            padding: 20,
        }}>
            <HeadingSeeMore left="Blog của bạn" right="Xem thêm" />
            <ListBlogComponent />
        </View>
    )
}