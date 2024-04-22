import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { deleteCompanyReviewAction, getCompanyRatingOfAccountAction } from '../../../../../redux/store/CompanyRating/CompanyRatingOfAccount/companyRatingOfAccountSlice';
import { getCompanyRatingAction } from '../../../../../redux/store/CompanyRating/companyRatingSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function ModalCreateUpdateEvaluateCompany({
    company,
    openModalCreateUpdateEvaluateCompany,
    setOpenModalCreateUpdateEvaluateCompany
}) {
    const dispatch = useDispatch()
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewCompanyOfAccount, setReviewCompanyOfAccount] = useState({})
    const companyRatingOfAccount = useSelector(state => state.companyRatingOfAccount.companyRatingOfAccount)

    useEffect(() => {
        dispatch(getCompanyRatingOfAccountAction(company.id, 'vi'));
    }, [company])


    useEffect(() => {
        if (companyRatingOfAccount && companyRatingOfAccount.data) {
            setReviewCompanyOfAccount(companyRatingOfAccount.data)
        }
    }, [companyRatingOfAccount])


    const handleDeleteReview = () => {
        dispatch(deleteCompanyReviewAction(companyRatingOfAccount.data.id))
        setOpenModalCreateUpdateEvaluateCompany(false)
        dispatch(getCompanyRatingAction(company.id, 10, 0, 'vi'))
        dispatch(getCompanyRatingOfAccountAction(company.id, 'vi'))
    }

    const handleStarPress = (value) => {
        setRating(value);
    };


    return (
        <View>
            <Modal
                isVisible={openModalCreateUpdateEvaluateCompany}
                onBackdropPress={() => setOpenModalCreateUpdateEvaluateCompany(false)}
                onSwipeComplete={() => setOpenModalCreateUpdateEvaluateCompany(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View style={styles.container}>
                    <View
                        style={styles.header}
                    >
                        <Text style={styles.titleHeader}>
                            Đánh giá của bạn
                        </Text>
                        <TouchableOpacity
                            onPress={() => setOpenModalCreateUpdateEvaluateCompany(false)}
                        >
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    {
                        (!reviewCompanyOfAccount) ? (
                            <View style={{
                                paddingHorizontal: 10,
                                marginTop: 10
                            }}>
                                <Text>
                                    Bạn đã đánh giá
                                </Text>
                                <View
                                    style={styles.content}
                                >
                                    <Text>
                                        {reviewCompanyOfAccount.comment}
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text>
                                            {reviewCompanyOfAccount.star}
                                        </Text>
                                        <AntDesign name="star" size={18} color="black" />
                                    </View>
                                </View>
                                <View style={styles.action}>
                                    <TouchableOpacity
                                        onPress={handleDeleteReview}
                                    >
                                        <Text
                                            style={[styles.button, {
                                                backgroundColor: '#D24545',
                                            }]}
                                        >
                                            Xóa
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text
                                            style={[styles.button, {
                                                marginLeft: 10,
                                                backgroundColor: '#FFD6A5',
                                            }]}
                                        >
                                            Sửa
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        ) : (
                            <>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <TouchableOpacity key={value} onPress={() => handleStarPress(value)}>
                                            <Text style={{ fontSize: 30, color: value <= rating ? 'gold' : 'gray' }}>&#9733;</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Nhập đánh giá của bạn"
                                        onChangeText={(text) => setComment(text)}
                                    />
                                </View>
                            </>
                        )
                    }
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '35%',
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10
    },
    titleHeader: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFEAE3',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    button: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    input: {
        borderWidth: 1,
        borderColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFEAE3',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    }
})