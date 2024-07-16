import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import ListBlogHistoryProfileComponent from '../Components/Blog/ListBlogHistoryProfileComponent/ListBlogHistoryProfileComponent';
import { getAllHistoryCommunityOfProileAction } from '../../redux/store/CommunityProfile/GetAllHistoryCommunitOfProile/getAllHistoryCommunitOfProileSlice';

export default function BlogHistoryProfileScreen() {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const allHistoryCommunityOfProfile = useSelector(state => state.allHistoryCommunityOfProfile.allHistoryCommunitOfProile)
    const [currentPage, setCurrentPage] = React.useState(0)
    const [communityData, setCommunityData] = React.useState([])
    const [isOver, setIsOver] = React.useState(false)
    const [total, setTotal] = React.useState(0)

    useEffect(() => {
        dispatch(getAllHistoryCommunityOfProileAction(currentPage, 10, 'v'))
    }, [])

    useEffect(() => {
        if (allHistoryCommunityOfProfile && allHistoryCommunityOfProfile.data) {
            setCommunityData(allHistoryCommunityOfProfile.data.communications)
            setIsOver(allHistoryCommunityOfProfile.data.is_over)
            setTotal(allHistoryCommunityOfProfile.data.total)
        }
    }, [allHistoryCommunityOfProfile])

    return (
        <View style={{
            backgroundColor: 'white',
            height: '100%'
        }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Ionicons name="arrow-back" size={24} color="#242670" />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 17,
                    marginLeft: 5,
                    fontWeight: 'bold',
                    color: '#242670'
                }}>
                    Blog cá nhân
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingTop: 10,
            }}>
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                }}>
                    Bài viết
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CreateBog', {
                            type: 'create',
                            data: null
                        })
                    }}
                >
                    <Ionicons name="add-circle-sharp" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View>
                <ListBlogHistoryProfileComponent communityData={communityData} total={total} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray'
    },
})