import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect } from 'react';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import ModalActionCv from '../ModalActionCv/ModalActionCv';
import { CheckLengthTitle } from '../../../utils/CheckLengthTitle';

export default function ContentCvList({ checkShow, profile, type }) {
    const [listCvs, setListCvs] = React.useState([]);
    const [showModalActionCv, setShowModalActionCv] = React.useState(false);
    const [nameCv, setNameCv] = React.useState('');
    const [statusCv, setStatusCv] = React.useState(0);
    const [idCv, setIdCv] = React.useState('');
    const [typeCv, setTypeCv] = React.useState(0);
    const [linkCv, setLinkCv] = React.useState('');

    useEffect(() => {
        if (profile && profile.profilesCvs) {
            setListCvs(profile.profilesCvs.filter(item => item.device === type))
        }
    }, [profile])

    return (
        <Animated.View style={styles.container}>
            {checkShow ? (
                <View style={styles.largeContainer}>
                    {listCvs?.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <TouchableOpacity style={styles.itemContainer}>
                                <View style={{
                                    height: '70%',
                                    width: '100%',
                                    position: 'relative',
                                }}>
                                    <Image source={{ uri: item.imageURL }} style={styles.image} />
                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            top: 5,
                                            right: 10,
                                            backgroundColor: '#B4B4B8',
                                            padding: 5,
                                            borderRadius: 15,
                                            width: 25,
                                            height: 25,
                                        }}
                                    >
                                        {item.status === 0 ? (
                                            <AntDesign style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center'
                                            }} name="staro" size={15} color="white" />
                                        ) : (
                                            <AntDesign style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                textAlign: 'center'
                                            }} name="star" size={15} color="#F7C566" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.content}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 5,
                                        width: '100%'
                                    }}>
                                        <View style={{
                                            width: '80%'
                                        }}>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    fontSize: 15,
                                                    fontWeight: 'bold'
                                                }}>{CheckLengthTitle(item.name)}</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: 'gray'
                                            }}>
                                                {moment(item.createdAt).format('DD/MM/YYYY')}
                                            </Text>
                                        </View>
                                        <TouchableOpacity onPress={() => {
                                            setShowModalActionCv(!showModalActionCv);
                                            setNameCv(item.name);
                                            setStatusCv(item.status);
                                            setIdCv(item.id);
                                            setTypeCv(item.device);
                                            setLinkCv(item.pdfURL);
                                        }}>
                                            <AntDesign name="ellipsis1" size={24} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ) : (
                listCvs?.map((item, index) => (
                    <TouchableOpacity style={styles.containerWidthSmall} key={index}>
                        <Animated.View style={[{
                            width: '90%',
                            flexDirection: 'row',
                        }]}>
                            <View
                                style={{
                                    width: 90,
                                    height: '100%',
                                }}
                            >
                                <Image source={{ uri: item.imageURL }} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </View>
                            <View style={{
                                marginLeft: 10,
                                marginTop: 5,
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>{CheckLengthTitle(item.name)}</Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'gray'
                                }}>
                                    {`Cập nhật lúc ${moment(item.createdAt).format('DD/MM/YYYY')}`}
                                </Text>
                            </View>
                        </Animated.View>
                        <View style={{
                            width: '10%',
                        }}>
                            <View
                                style={{
                                    backgroundColor: '#B4B4B8',
                                    padding: 5,
                                    borderRadius: 15,
                                    width: 25,
                                    height: 25,
                                    marginTop: 5,
                                    alignItems: 'center',
                                }}>
                                {item.status === 0 ? (
                                    <AntDesign style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }} name="staro" size={15} color="white" />
                                ) : (
                                    <AntDesign style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }} name="star" size={15} color="#F7C566" />
                                )}

                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setShowModalActionCv(!showModalActionCv);
                                    setNameCv(item.name);
                                    setStatusCv(item.status);
                                    setIdCv(item.id);
                                    setTypeCv(item.device);
                                    setLinkCv(item.pdfURL);
                                }}
                                style={{
                                    marginTop: 5,
                                }}>
                                <AntDesign name="ellipsis1" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))
            )}
            {
                <ModalActionCv
                    profile={profile}
                    idCV={idCv}
                    statusCv={statusCv}
                    nameCv={nameCv}
                    showModalActionCv={showModalActionCv}
                    setShowModalActionCv={setShowModalActionCv}
                    typeCv={typeCv}
                    linkCv={linkCv}
                />
            }
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    largeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between',
    },
    item: {
        width: '47%',
        height: 200,
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
        borderColor: '#242670',
        borderWidth: 0.5,
    },
    itemContainer: {
        height: '100%',
        width: '100%',
    },
    image: {
        height: '100%',
        width: '100%',
        objectFit: 'contain',
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
        borderColor: '#242670',
        borderWidth: 0.5,
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
});
