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
            setCompany(response.data.data.companies);
        }
    }

    useEffect(() => {
        getCompany();
    }, [])
    return (
        <View style={styles.container}>
            <Heading props={{ title: "Công ty nổi bật", extra: "Xem thêm" }} />
            <View style={{
                marginTop: 10,
            }}>
                <FlatList
                    data={company}
                    horizontal={true}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={[styles.item, 
                            selectItem === index ? { backgroundColor: 'rgba(161, 189, 139, 0.1)' } : null
                        ]} onPress={()=> {
                            setSelectItem(index);
                            navigation.navigate('CompanyDetail', { id: item.id });
                        }}>
                            <View>
                                <Image source={{ uri: item.logoPath }}
                                    style={styles.image}
                                />
                                <Text style={styles.title}>{CheckLengthTitle(item.name)}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        maxHeight: 200,
        marginBottom: 30,   
    },
    item: {
        gap: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 0.1,
        margin: 5,
        width: 230,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.primary
    },
    image: {
        height: '70%',
        width: 250,
        objectFit: 'contain',
    },
    title: {
        fontSize: 13,
        height: '30%',
        fontWeight: 'bold',
        color: 'black',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 10,
    }
})