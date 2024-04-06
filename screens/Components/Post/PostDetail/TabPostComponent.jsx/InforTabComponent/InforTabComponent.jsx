import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import CommonInforTabComponent from './CommonInforTabComponent/CommonInforTabComponent'
import DescriptionComponent from './DescriptionComponent/DescriptionComponent'
import AddressComponent from './AddressComponent/AddressComponent'

export default function InforTabComponent({ post }) {
    return (
        <ScrollView style={styles.container}>
            <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                marginBottom: 10
            }}>Thông tin chung</Text>

            <CommonInforTabComponent post={post} />

            <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                marginTop: 30,
            }}>Mô tả công việc</Text>

            <DescriptionComponent post={post} />

            <Text style={{
                fontSize: 17,
                fontWeight: 'bold',
                marginTop: 30,
            }}>Địa chỉ làm việc</Text>

            <AddressComponent post={post} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
        marginBottom: 200,
    }
})