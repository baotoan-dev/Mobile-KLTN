import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { searchApi } from '../../../../../../../api/search/searchApi'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import ListJobComponent from '../../JobTabComponent/JobTabComponent'

export default function JobCompanyOfTab({ nameCompany }) {
    const [listJob, setListJob] = useState([])

    const fetchDataCompany = async () => {
        const result = (await searchApi.getSearchByQueryV2(
            nameCompany,
            null,
            null,
            null,
            null,
            0,
            null,
            null,
            null,
            null,
            [],
            null,
            null,
            null,
            "vi"
        ));
        if (result && result.data) {
            setListJob(result.data.data.posts)
        }
    }

    useEffect(() => {
        if (nameCompany) {
            fetchDataCompany()
        }
    }, [nameCompany])

    return (
        <View>
            <ListJobComponent listJob={listJob} />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#d9d9d9'
    }
})