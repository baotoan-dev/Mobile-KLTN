import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HeadingContentProfile from '../HeadingContentProfile/HeadingContentProfile'

export default function AddressExpect({ profile }) {

    return (
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: 10,
            }}>
                <HeadingContentProfile left='Mong muốn công việc' right='Sửa' />
                <View style={styles.wapper}>
                    {
                        profile && profile?.profileLocations?.length > 0 ? profile?.profileLocations?.map((item, index) => {
                            return (
                                <View style={styles.item}>
                                    <Text>{item.fullName}</Text>
                                </View>
                            )
                        }
                        ) : <View>
                            <Text>Chưa cập nhật</Text>
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        paddingTop: 10,
    },
    wapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    item: {
        borderBottomColor: 'gray',
        borderWidth: 0.1,
        alignSelf: 'flex-start',
        marginLeft: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        marginBottom: 10,
    }
})