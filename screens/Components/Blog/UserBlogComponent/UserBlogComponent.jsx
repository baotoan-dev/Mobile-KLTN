import { View, Text } from 'react-native'
import React from 'react'
import HeadingSeeMore from '../HeadingSeeMore/HeadingSeeMore'
import ListBlogComponent from '../ListBlogComponent/ListBlogComponent'
import { useState } from 'react'
import { communityApi } from '../../../../api/community/communityApi'
import { useNavigation } from '@react-navigation/native'

export default function UserBlogComponent() {
    const [blogUser, setBlogUser] = useState([]);
    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            const res = await communityApi.getCommunityNews("0", "5", "cm", 0, "vi");

            if (res && res.status === 200) {
                setBlogUser(res.data.data.communications);
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
            <HeadingSeeMore left="Blog của bạn" right="Xem thêm" handleSeeMore={() => {
                navigation.navigate('SeeAllBlog', {type: 'user'})
            }}/>
            <ListBlogComponent blog={blogUser}/>
        </View>
    )
}