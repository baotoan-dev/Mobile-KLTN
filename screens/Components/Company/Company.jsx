import { View, Text, Animated, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { companyApi } from '../../../api/company/companyApi';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Heading from '../Heading/Heading';
import { Color } from '../../../utils/Color';
import { CheckLengthTitle } from '../../../utils/CheckLengthTitle';
import { useNavigation } from '@react-navigation/native';
import { Fontisto } from '@expo/vector-icons';

export default function Company() {
    const [company, setCompany] = useState([]);
    const translateY = useRef(new Animated.Value(0)).current
    const navigation = useNavigation()

    const getCompany = async () => {
        const response = await companyApi.getAllCompany();

        if (response && response.data.status === 200) {
            setCompany(response.data.data.companies.slice(0, 4))
        }
    }

    useEffect(() => {
        getCompany();
    }, [])

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(translateY, {
                    toValue: -5,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 5,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]),
        )
        animation.start()


        // Clean up animation on component unmount
        return () => animation.stop()
    }, [translateY])

    return (
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: 10,
            }}>
                <Heading props={{
                    title: "Công ty nổi bật", extra: "Xem thêm", handleSeeMore: () => {
                        navigation.navigate('MoreInforOfTopCompany')
                    }
                }} />
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('HotCompany')
                }}
                style={{
                    paddingHorizontal: 10,
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <Animated.Text style={[{
                    fontSize: 12,
                    color: 'red',
                    fontWeight: 'bold',
                }, {
                    transform: [{ translateY: translateY }]
                }]}>
                    Công ty hot
                </Animated.Text>
                <Animated.View style={[{
                    marginLeft: 5,
                }, {
                    transform: [{ translateY: translateY }]
                }]}>
                    <Fontisto name="fire" size={20} color="red" />
                </Animated.View>
            </TouchableOpacity>
            <View style={[{
                marginTop: 10,
            }, styles.wapper]}>
                {
                    company.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    navigation.navigate('CompanyDetail', { id: item.id })
                                }}
                                style={[styles.item]}
                            >
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: item.logoPath,
                                    }}
                                />
                                <Text style={styles.title}>
                                    {CheckLengthTitle(item.name, 30)}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        maxHeight: 320,
        marginBottom: 150,
    },
    wapper: {
        gap: 10,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.primary
    },
    item: {
        width: '45%',
        height: 170,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 14,
        shadowColor: "#97E7E1",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        borderRadius: 5,
        borderColor: '#242670',
        borderWidth: 0.5,
    },
    image: {
        height: '70%',
        width: '100%',
        objectFit: 'contain',
        marginTop: 10,
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        color: 'black',
        fontStyle: 'italic',
        textAlign: 'center',
        height: '30%',
        marginTop: 5,
    }
})