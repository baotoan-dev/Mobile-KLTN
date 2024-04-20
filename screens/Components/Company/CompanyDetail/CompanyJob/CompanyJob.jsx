import { View, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPostCompanyAction } from '../../../../../redux/store/Company/GetAllPostCompany/getAllPostCompany';
import ListJobOfCompanyComponent from '../../../Post/ListJobOfCompanyComponent/ListJobOfCompanyComponent';
import { FontAwesome } from '@expo/vector-icons';

export default function CompanyJob({ company }) {
    const dispatch = useDispatch()
    const [listJob, setListJob] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [isOver, setIsOver] = useState(false)
    const getAllPostCompany = useSelector(state => state.getAllPostCompany.data)

    useEffect(() => {
        if (company.id) {
            dispatch(getAllPostCompanyAction(company.id, 10, currentPage))
        }
    }, [company.id])

    useEffect(() => {
        if (getAllPostCompany && getAllPostCompany.postData) {
            if (currentPage === 0) {
                setListJob(getAllPostCompany.postData.data)
            }
            else {
                setListJob((prev) => [...prev, ...getAllPostCompany.postData.data])
            }
            setIsOver(getAllPostCompany.postData.is_over)
        }
    }, [getAllPostCompany])


    return (
        <View style={styles.container}>
            {
                listJob ? (
                    <ListJobOfCompanyComponent
                        listJob={listJob}
                        setCurrentPage={setCurrentPage}
                        isOver={isOver}
                    />
                ) 
                :
                    <View style={{
                        flex: 1,
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                        <FontAwesome name="binoculars" size={24} color="black" />
                        <Text style={{
                            marginTop: 10,
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>
                            Không tìm thấy công việc
                        </Text>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: '100%',
    }
})