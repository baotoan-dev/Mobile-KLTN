import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect } from 'react';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import ModalActionCv from '../ModalActionCv/ModalActionCv';

export default function ContentCvList({ checkShow, profile }) {
    const [listCvs, setListCvs] = React.useState([]);
    const [itemOpacity] = React.useState(new Animated.Value(0));
    const [itemScale] = React.useState(new Animated.Value(0));
    const [showModalActionCv, setShowModalActionCv] = React.useState(false);
    const [nameCv, setNameCv] = React.useState('');
    const [statusCv, setStatusCv] = React.useState(0);

    useEffect(() => {
        if (profile) {
            setListCvs(profile.profilesCvs);
        }
    }, [profile]);

    useEffect(() => {
        Animated.timing(itemOpacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();

        Animated.spring(itemScale, {
            toValue: 1,
            tension: 20,
            friction: 4,
            useNativeDriver: true
        }).start()
    }, []);

    return (
        <Animated.View style={styles.container}>
            {checkShow ? (
                listCvs?.map((item, index) => (
                    <Animated.View key={index} style={[styles.item, {
                        opacity: itemOpacity,
                        transform: [{ scale: itemScale }]
                    }]}>
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
                                    {item.status === 0 ? (
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
                                    )}
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
                                        setShowModalActionCv(true);
                                        setNameCv(item.name);
                                        setStatusCv(item.status);
                                    }}>
                                        <AntDesign name="ellipsis1" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                ))
            ) : (
                listCvs?.map((item, index) => (
                    <TouchableOpacity style={styles.containerWidthSmall} key={index}>
                        <Animated.View style={[{
                            width: '90%',
                            flexDirection: 'row',
                        }]}>
                            <View
                                style={{
                                    width: 80,
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
                                }}>{item.name}</Text>
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
                                    width: 30,
                                    height: 30,
                                    marginTop: 5,
                                }}>
                                {item.status === 0 ? (
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
                                )}
                                <TouchableOpacity 
                                onPress={() => {
                                    setShowModalActionCv(true);
                                    setNameCv(item.name);
                                    setStatusCv(item.status);
                                }}
                                style={{
                                    marginTop: 5,
                                }}>
                                    <AntDesign name="ellipsis1" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            )}
            {
                <ModalActionCv statusCv={statusCv} nameCv={nameCv} showModalActionCv={showModalActionCv} setShowModalActionCv={setShowModalActionCv} />
            }
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    item: {
        width: '48%',
        height: 200,
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
});
