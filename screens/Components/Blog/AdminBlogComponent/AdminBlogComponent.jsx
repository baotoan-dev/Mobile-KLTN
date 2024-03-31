import { View, Text } from 'react-native'
import React from 'react'
import HeadingSeeMore from '../HeadingSeeMore/HeadingSeeMore'
import ListBlogComponent from '../ListBlogComponent/ListBlogComponent'
import { communityApi } from '../../../../api/community/communityApi'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function AdminBlogComponent() {
    const [blogAdmin, setBlogAdmin] = useState([]);
    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            const res = await communityApi.getCommunityNews("0", "5", "cm", 1, "vi");

            if (res && res.status === 200) {
                setBlogAdmin(res.data.data.communications);
            }

        } catch (error) {
            throw error
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={{
            padding: 20,
        }}>
            <HeadingSeeMore left="Chia sẻ từ trang" right="Xem thêm" handleSeeMore = {() => {
                navigation.navigate('SeeAllBlog', {type: 'admin'})
            }}/>
            <ListBlogComponent blog={blogAdmin}/>
        </View>
    )
}