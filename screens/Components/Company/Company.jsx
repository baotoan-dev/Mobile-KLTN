import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { companyApi } from '../../../api/company/companyApi';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Heading from '../Heading/Heading';
import { Color } from '../../../utils/Color';
import { CheckLengthTitle } from '../../../utils/CheckLengthTitle';
import { useNavigation } from '@react-navigation/native';

export default function Company() {
    const [company, setCompany] = useState([]);
    const [selectItem, setSelectItem] = useState(0);
    const navigation = useNavigation();

    const getCompany = async () => {
        const response = await companyApi.getAllCompany();

        if (response && response.data.status === 200) {
            setCompany(response.data.data.companies.slice(0, 4));
        }
    }

    useEffect(() => {
        getCompany();
    }, [])
    return (
        <View style={styles.container}>
            <View style={{
                paddingHorizontal: 10,
            }}>
                <Heading props={{ title: "Công ty nổi bật", extra: "Xem thêm" }} />
            </View>
            <View style={[{
                marginTop: 10,
            }, styles.wapper]}>
                {
                    company.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    console.log(item.id);
                                    navigation.navigate('CompanyDetail', { id: item.id })
                                }}
                                style={[styles.item, {
                                    borderColor: selectItem === index ? Color.primary : 'white',
                                }]}
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
                    }
                    )
                }
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        maxHeight: 300,
        marginBottom: 100,
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
        height: 150,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        marginTop: 14,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
        borderRadius: 10,
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