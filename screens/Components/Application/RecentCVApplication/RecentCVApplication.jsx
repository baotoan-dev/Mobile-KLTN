import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function RecentCVApplication({
    setIsCheckRecentCV,
    isCheckRecentCV,
    profile,
    setIdFromCVRecent,
    setTypeApplication
}) {
    const navigation = useNavigation();
    const [listCv, setListCv] = React.useState({})

    useEffect(() => {
        if (profile && profile.profilesCvs && profile.profilesCvs.length > 0) {
            setListCv(profile.profilesCvs.filter(cv => cv.isNew === 1)[0])
        }
    }, [profile])

    useEffect(() => {
        if (listCv) {
            setIdFromCVRecent(listCv.id);
        } else {
            setIdFromCVRecent(null);
        }
    }, [listCv]);

    useEffect(() => {
        if (isCheckRecentCV) {
            setTypeApplication('near');
        }
        else {
            setTypeApplication(null)
        }
    }, [isCheckRecentCV])

    return (
        <View style={styles.container}>
            <View style={styles.flexItem}>
                <RadioButton
                    value="first"
                    status={isCheckRecentCV ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsCheckRecentCV(!isCheckRecentCV)
                    }}
                />
                <Text>
                    CV ứng tuyển gần nhất
                </Text>
            </View>
            {
                (isCheckRecentCV && listCv) && (
                    <View style={{
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontSize: 12,
                            marginBottom: 10,
                            color: 'gray'
                        }}>
                            {`Thời gian ứng tuyển gần nhất: ${moment(listCv?.updatedAt).format('DD/MM/YYYY')}`}
                        </Text>

                        {profile && (
                            <View style={styles.content}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}>
                                    <Text style={{
                                        color: '#5755FE',
                                        fontWeight: 'bold',
                                        fontSize: 13
                                    }}>
                                        {listCv?.name}
                                    </Text>
                                    <TouchableOpacity onPress={() => {
                                        //  navigation.navigate('SeenCvApplication', {
                                        //     cv: post.cvApplication
                                        // })
                                    }}>
                                        <Text style={{
                                            color: '#5755FE',
                                            fontWeight: 'bold',
                                            fontSize: 13
                                        }}>
                                            Xem CV
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    width: '100%'
                                }}>
                                    <View style={{
                                        flexDirection: 'column',
                                        width: '35%'
                                    }}>
                                        <Text style={styles.titleContent}>
                                            Họ và tên:
                                        </Text>
                                        <Text style={[styles.titleContent, {
                                            marginTop: 5
                                        }]}>
                                            Email:
                                        </Text>
                                        <Text style={[styles.titleContent, {
                                            marginTop: 5
                                        }]}>
                                            Số điện thoại:
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'column',
                                        width: '65%'
                                    }}>
                                        <Text>
                                            {profile.name}
                                        </Text>
                                        <Text style={{
                                            marginTop: 5
                                        }}>
                                            {profile.email}
                                        </Text>
                                        <Text style={{
                                            marginTop: 5
                                        }}>
                                            {
                                                profile.phone
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                )
            }
            {
                (isCheckRecentCV && !listCv) && (
                    <View style={{
                        paddingHorizontal: 10
                    }}>
                        <Text style={{
                            fontSize: 12,
                            marginBottom: 10,
                            color: 'gray'
                        }}>
                            Bạn chưa có CV ứng tuyển gần nhất
                        </Text>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingVertical: 10,
        zIndex: 1000,
    },
    flexItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#CCD3CA',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 7
    },
    titleContent: {
        color: 'gray',
    }
})