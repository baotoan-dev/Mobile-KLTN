import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HeadingContentProfile from '../HeadingContentProfile/HeadingContentProfile'
import ModalUpdateJobExpect from './ModalUpdateJobExpect/ModalUpdateJobExpect'

export default function JobExpect({ profile }) {
    const [isOpenModalUpdateJobExpect, setIsOpenModalUpdateJobExpect] = React.useState(false)
    const handleOpenModal = () => {
        setIsOpenModalUpdateJobExpect(!isOpenModalUpdateJobExpect)
    }

    return (
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: 10,
            }}>
                <HeadingContentProfile left='Mong muốn công việc' right='Sửa' handleOpenModal={handleOpenModal}/>
                <View style={styles.wapper}>
                    {
                        profile && profile?.profileCategorie?.length > 0 ? profile?.profileCategories?.map((item, index) => {
                            return (
                                <View style={styles.item}>
                                    <Text>{item.fullName}</Text>
                                </View>
                            )
                        }
                        ) : <View>
                            <Text style={{
                                fontWeight: 'bold',
                                color: 'blue',
                            }}>Chưa cập nhật</Text>
                        </View>
                    }
                </View>
                <ModalUpdateJobExpect isOpenModal={isOpenModalUpdateJobExpect} handleOpenModal={handleOpenModal} /> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        paddingVertical: 20,
    },
    wapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        borderBottomColor: 'gray',
        borderWidth: 0.1,
        alignSelf: 'flex-start',
        marginLeft: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'white',
    }
})