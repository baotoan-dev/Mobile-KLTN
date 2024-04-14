import { View, Image, Text, ScrollView, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { companyApi } from '../../../../api/company/companyApi';
import { Tab } from '@rneui/themed';
import CompanyJob from './CompanyJob/CompanyJob';
import Information from './Information/Information';
import OurCompany from '../OurCompany/OurCompany';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { createFollowCompanyAction } from '../../../../redux/store/FollowCompany/followCompanySlice';
import { getProfileAnalyticsAction } from '../../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice';

export default function CompanyDetail(prop) {

    const id = prop.route.params.id;
    const dispatch = useDispatch();
    const [company, setCompany] = useState();
    const [index, setIndex] = useState(0);

    const fetchInforCompany = async () => {
        const res = await companyApi.getDetailCompany(id, 'vi');

        if (res && res.data && res.data.status === 200) {
            setCompany(res.data.data);
        }
    }

    useEffect(() => {
        fetchInforCompany()
    }, [id])

    const handleCreateFollowCompany = async () => {
        try {
            dispatch(createFollowCompanyAction(id)).then(() => {
                fetchInforCompany();
            })
            dispatch(getProfileAnalyticsAction());
        } catch (error) {
            throw error;
        }
    }

    return (
        <SafeAreaView>
            {
                company && (
                    <ScrollView style={styles.container}>
                        <ImageBackground style={styles.wapper}
                            source={{ uri: 'data:image/jpeg;base64,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' }}
                        >
                            <TouchableOpacity style={{
                                position: 'absolute',
                                left: 10,
                                top: 10,
                                backgroundColor: 'gray',
                                borderRadius: 20,
                                padding: 5
                            }}
                                onPress={() => prop.navigation.goBack()}
                            >
                                <Ionicons name="arrow-back" size={24} color="black" />
                            </TouchableOpacity>
                            <View style={styles.logo} >
                                <Image source={{ uri: company.logoPath ? company.logoPath : '' }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: 20,
                                    }} />
                            </View>
                        </ImageBackground>
                        <Text style={{
                            marginTop: 80,
                            fontWeight: 'bold',
                            fontSize: 24,
                            textAlign: 'center',
                        }}>
                            {company.name}
                        </Text>

                        <Text style={{
                            textAlign: 'center',
                            marginBottom: 10,
                        }}>
                            Đia chỉ: {company.address}
                        </Text>
                        <Text style={{
                            textAlign: 'center',
                        }}>
                            {company.countFollowCompany} người theo dõi
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                handleCreateFollowCompany()
                            }}
                            style={styles.follow}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center',
                            }}>
                                {
                                    company.isFollowed === true ? 'Đã theo dõi' : 'Theo dõi'
                                }
                            </Text>
                        </TouchableOpacity>

                        <View style={{
                            marginTop: 10,
                            height: 500,
                            backgroundColor: 'white',
                            overflow: 'scroll',
                        }}>
                            <Tab value={index} onChange={setIndex} dense>
                                <Tab.Item
                                    titleStyle={{
                                        color: 'blue'
                                    }}>Thông tin
                                </Tab.Item>
                                <Tab.Item
                                    titleStyle={{
                                        color: 'blue'
                                    }}
                                >Việc làm
                                </Tab.Item>
                            </Tab>
                            {
                                company && company.id && (
                                    <ScrollView>
                                        {index === 1 ? <CompanyJob company={company} /> : <Information company={company} />}
                                    </ScrollView>
                                )
                            }
                        </View>
                        <View>
                            <OurCompany company={company} />
                        </View>
                    </ScrollView>
                )
            }
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flexDirection: 'column',
        height: '100%',
    },
    wapper: {
        height: 180,
        position: 'relative'
    },
    logo: {
        width: 180,
        height: 120,
        borderRadius: 100,
        left: '30%',
        position: 'absolute',
        bottom: -60,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: 0.5,
    },
    follow: {
        marginTop: 10,
        borderWidth: 0.2,
        marginHorizontal: '10%',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#0b61ae',
        marginBottom: 20,
    }
})
