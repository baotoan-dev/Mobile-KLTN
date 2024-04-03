import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import HeadingContentProfile from '../HeadingContentProfile/HeadingContentProfile'
import ModalUpdateAddressExpect from './ModalUpdateAddressExpect/ModalUpdateAddressExpect'

export default function AddressExpect({ profile }) {

    const [isOpenModalUpdateAddress, setIsOpenModalUpdateAddress] = React.useState(false)
    const [listAddressExpect, setListAddressExpect] = React.useState([])
    const handleOpenModal = () => {
        setIsOpenModalUpdateAddress(!isOpenModalUpdateAddress)
    }
    return (
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: 10,
            }}>
                <HeadingContentProfile left='Địa điểm mong muốn' right='Sửa'
                    handleOpenModal={handleOpenModal}
                />
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
                            <Text style={{
                                fontWeight: 'bold',
                                color: 'blue',
                            }}>Chưa cập nhật</Text>
                        </View>
                    }
                </View>
            </View>
            <ModalUpdateAddressExpect
                listAddressExpect={listAddressExpect}
                setListAddressExpect={setListAddressExpect}
                isOpenModal={isOpenModalUpdateAddress}
                handleOpenModal={handleOpenModal} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10,
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