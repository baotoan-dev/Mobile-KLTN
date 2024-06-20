import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { templateApi } from '../../../api/template/templateApi';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../../redux/store/Profile/profileSilce';
import { getCvLayoutAction } from '../../../redux/store/CvLayout/cvLayoutSlice';
import { Ionicons } from '@expo/vector-icons';

export default function ThemeCvList() {
    const colors = [
        '#529300',
        '#3B82F6'
    ]
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const profile = useSelector((state) => state.profile.profile);
    const [themeCv, setThemeCv] = React.useState([])
    const [cvIndex, setCvIndex] = React.useState(0)
    const [templateId, setTemplateId] = React.useState(0)
    const fetchThemeCv = async () => {
        const res = await templateApi.getAllTemplates()

        if (res && res.data && res.data.status === 200) {
            setThemeCv(res.data.data)
            setThemeCv(res.data.data.slice(0, 1))
        }
    }

    useEffect(() => {
        fetchThemeCv()
    }, [])

    useEffect(() => {
        dispatch(getProfileAction('vi'));
    }, [dispatch]);

    useEffect(() => {
        if (profile) {
            if (profile.profilesCvs.length === 0) {
                setCvIndex(0);
            } else {
                let maxIndex = 0;
                profile.profilesCvs.forEach((item) => {
                    if (item.cvIndex > maxIndex) {
                        maxIndex = item.cvIndex;
                    }
                });
                setCvIndex(maxIndex + 1);
            }
        }
    }, [profile]);

    useEffect(() => {
        dispatch(getCvLayoutAction(cvIndex));
    }, [cvIndex])

    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('CV')
                    }}>
                        <Ionicons name="arrow-back-outline" size={24} color="#242670" />
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Chọn mẫu CV
                    </Text>
                </View>
            </View>
            <View>
                <View style={{
                    paddingHorizontal: 20,
                    marginTop: 10,
                }}>
                    {
                        themeCv && (
                            <View>
                                <Text style={{
                                    color: 'gray',
                                    fontSize: 12
                                }}>
                                    {
                                        `Tổng số mẫu CV: ${themeCv.length}`
                                    }
                                </Text>
                            </View>
                        )
                    }
                </View>
                <ScrollView style={{
                    marginBottom: 50
                }}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}>
                        {themeCv?.map((item, index) => {
                            return (
                                <View key={index} style={{
                                    width: '44%',
                                    height: 220,
                                    borderWidth: 0.3,
                                    borderRadius: 3,
                                    margin: 10,
                                    borderColor: '#242670',
                                    backgroundColor: 'white',
                                    padding: 10,
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5,
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setTemplateId(item.id)
                                            navigation.navigate(
                                                'PDFScreen',
                                                {
                                                    templateId: index,
                                                    typeAction: 'create',
                                                    cvIndexParent: cvIndex,
                                                }
                                            )
                                        }}
                                    >
                                        <View style={{
                                            width: '100%',
                                            height: '70%'
                                        }}>
                                            <Image source={{ uri: item.image }} style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: 5,
                                            }} />
                                        </View>
                                        <View style={{
                                            width: '100%',
                                            height: '30%',
                                            marginTop: 10,
                                            paddingHorizontal: 10
                                        }}>
                                            <Text style={{
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                                color: 'black'
                                            }}>{item.name}</Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                marginTop: 5
                                            }}>
                                                {
                                                    colors.map((color, index) => {
                                                        return (
                                                            <View
                                                                key={index}
                                                                style={{
                                                                    width: 20,
                                                                    height: 20,
                                                                    borderRadius: 15,
                                                                    backgroundColor: color,
                                                                    marginRight: 10
                                                                }}
                                                            >
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    containerHeader: {
        paddingTop: 30,
        width: '100%',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        zIndex: 100,
        elevation: 100,
        shadowColor: 'black',
        paddingBottom: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        zIndex: 100,
    },
    title: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#242670',
    }
})