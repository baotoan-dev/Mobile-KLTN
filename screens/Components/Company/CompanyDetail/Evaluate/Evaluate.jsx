import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCompanyRatingAction } from '../../../../../redux/store/CompanyRating/companyRatingSlice';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { getProfileAction } from '../../../../../redux/store/Profile/profileSilce';
import { deleteCompanyReviewAction, getCompanyRatingOfAccountAction } from '../../../../../redux/store/CompanyRating/CompanyRatingOfAccount/companyRatingOfAccountSlice';
import ModalCreateUpdateEvaluateCompany from '../ModalCreateUpdateEvaluateCompany/ModalCreateUpdateEvaluateCompany';

export default function Evaluate({
    company
}) {
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)
    const companyRating = useSelector(state => state.companyRating.companyRating)
    const [listCompanyRating, setListCompanyRating] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [averageRated, setAverageRated] = useState(0)

    useEffect(() => {
        dispatch(getCompanyRatingAction(company.id, 10, currentPage, 'vi'))
        dispatch(getProfileAction('vi'))
    }, [])

    useEffect(() => {
        if (companyRating && companyRating.data) {
            setTotal(companyRating.data.total)
            setAverageRated(companyRating.data.averageRated)
            if (currentPage === 0) {
                setListCompanyRating(companyRating.data.companyRatings)
            }
            else {
                setListCompanyRating((prev) => [...prev, ...companyRating.data.companyRatings])
            }
        }
    }, [companyRating])

    return (
        <View style={styles.container}>
            {
                total > 0 ? (
                    <View>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            marginBottom: 10
                        }}>
                            Tổng cộng {total} đánh giá ({averageRated} <AntDesign name="star" size={18} color="black" />)
                        </Text>
                        <FlatList
                            data={listCompanyRating}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.item}>
                                    <View style={styles.left}>
                                        <Image
                                            source={{ uri: item.profileData.avatarPath ? item.profileData.avatarPath : 'https://www.w3schools.com/howto/img_avatar.png' }}
                                            style={{ width: 50, height: 50, borderRadius: 25 }}
                                        />
                                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                            <Text style={{ fontWeight: 'bold', color: (profile.accountId === item.profileData.accountId) ? 'blue' : 'black' }}>
                                                {item.profileData.nameHide ? item.profileData.nameHide : 'Ẩn danh'}
                                            </Text>
                                            <Text>
                                                {item.comment}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.right}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text>
                                                {item.star}
                                            </Text>
                                            <AntDesign style={{
                                                marginLeft: 3
                                            }} name="star" size={18} color="black" />
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                ) : (
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            source={require('../../../../../images/no-comment.png')}
                            style={{ width: 100, height: 100, marginTop: 50 }}
                        />
                        <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>
                            Chưa có đánh giá nào
                        </Text>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        paddingHorizontal: 30,
        marginTop: 10,
    },
    item: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%'
    },
    right: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '10%'
    }
})