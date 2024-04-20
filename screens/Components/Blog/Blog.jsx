import { View, Text } from 'react-native'
import React from 'react'
import HeadingBlog from './HeadingBlog/HeadingBlog'
import UserBlogComponent from './UserBlogComponent/UserBlogComponent'
import AdminBlogComponent from './AdminBlogComponent/AdminBlogComponent'

export default function Blog() {
    return (
        <View>
            <HeadingBlog />
            <UserBlogComponent />
            <AdminBlogComponent />
        </View>
    )
}