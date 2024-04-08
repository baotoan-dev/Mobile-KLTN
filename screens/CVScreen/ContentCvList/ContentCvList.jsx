import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons';

export default function ContentCvList({ checkShow, profile }) {
    const [listCvs, setListCvs] = React.useState([])
    const [openModalAction, setOpenModalAction] = React.useState(false)
    useEffect(() => {
        if (profile) {
            setListCvs(profile.profilesCvs);
        }
    }, [profile])

    return (
        <View>
            {
                checkShow ? (
                    <View style={styles.container}>
                        {
                            listCvs?.map((item, index) => (
                                <View key={index} style={styles.item}>
                                    <TouchableOpacity style={styles.itemContainer}>
                                        <View style={{
                                            height: '70%',
                                            width: '100%',
                                            position: 'relative'
                                        }}>
                                            <Image source={{ uri: item.imageURL }} style={styles.image} />
                                            <TouchableOpacity
                                                style={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    backgroundColor: '#B4B4B8',
                                                    padding: 5,
                                                    borderRadius: 15,
                                                    width: 30,
                                                    height: 30,
                                                }}
                                            >
                                                {
                                                    item.status === 0 ? (
                                                        <AntDesign style={{
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            textAlign: 'center'
                                                        }} name="staro" size={18} color="white" />
                                                    ) : (
                                                        <AntDesign style={{
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            textAlign: 'center'
                                                        }} name="star" size={18} color="#F7C566" />
                                                    )
                                                }
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.content}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: 5
                                            }}>
                                                <View>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        fontWeight: 'bold'
                                                    }}>{item.name}</Text>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: 'gray'
                                                    }}>
                                                        {moment(item.createdAt).format('DD/MM/YYYY')}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity onPress={() => {
                                                    setOpenModalAction(true)
                                                }}>
                                                    <AntDesign name="ellipsis1" size={24} color="black" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                ) : (
                    <View>
                        {
                            listCvs?.map((item, index) => (
                                <TouchableOpacity style={styles.containerWidthSmall} key={index}>
                                    <View style={{
                                        width: '90%',
                                        flexDirection: 'row',
                                    }}>
                                        <View
                                            style={{
                                                width: 80,
                                                height: '100%',
                                            }}
                                        >
                                            <Image source={{ uri: item.imageURL }} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </View>
                                        <View style={{
                                            marginLeft: 10,
                                            marginTop: 5,
                                        }}>
                                            <Text style={{
                                                fontSize: 15,
                                                fontWeight: 'bold'
                                            }}>{item.name}</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: 'gray'
                                            }}>
                                                {`Cập nhật lúc ${moment(item.createdAt).format('DD/MM/YYYY')}`}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        width: '10%',
                                    }}>
                                        <View
                                            style={{
                                                backgroundColor: '#B4B4B8',
                                                padding: 5,
                                                borderRadius: 15,
                                                width: 30,
                                                height: 30,
                                                marginTop: 5,
                                            }}>
                                            {
                                                item.status === 0 ? (
                                                    <AntDesign style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        textAlign: 'center'
                                                    }} name="staro" size={18} color="white" />
                                                ) : (
                                                    <AntDesign style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        textAlign: 'center'
                                                    }} name="star" size={18} color="#F7C566" />
                                                )
                                            }
                                            <TouchableOpacity style={{
                                                marginTop: 5,
                                            }}>
                                                <AntDesign name="ellipsis1" size={24} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '48%',
        height: 200,
        borderWidth: 0.5,
        borderColor: 'gray',
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemContainer: {
        height: '100%',
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    content: {
        height: '30%',
        width: '100%',
        padding: 5,
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    containerWidthSmall: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 80,
        borderWidth: 0.2,
        borderColor: '#B4B4B8',
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})