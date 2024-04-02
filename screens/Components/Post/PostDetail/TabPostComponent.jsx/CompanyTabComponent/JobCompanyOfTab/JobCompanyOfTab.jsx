import { View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPostCompanyAction } from '../../../../../../../redux/store/Company/GetAllPostCompany/getAllPostCompany'
import ListJobOfCompanyComponent from '../../../../ListJobOfCompanyComponent/ListJobOfCompanyComponent'

export default function JobCompanyOfTab({ idCompany }) {
    const dispatch = useDispatch()
    const [listJob, setListJob] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [isOver, setIsOver] = useState(false)
    const getAllPostCompany = useSelector(state => state.getAllPostCompany.data)

    useEffect(() => {
        if (idCompany) {
            dispatch(getAllPostCompanyAction(idCompany, 10, currentPage))
        }
    },[])

    useEffect(() => {
        if (getAllPostCompany) {
            if (currentPage === 0) {
                setListJob(getAllPostCompany)
            }
            else {
                setListJob((prev) => [...prev, ...getAllPostCompany])
            }
        }
        setIsOver(getAllPostCompany?.postData?.is_over)
    }, [getAllPostCompany])

    return (
        <View>
            {
                listJob && (
                    <ListJobOfCompanyComponent
                        listJob={listJob}
                        setCurrentPage={setCurrentPage}
                        isOver={isOver}
                    />
                )
            }
        </View>
    )
}

