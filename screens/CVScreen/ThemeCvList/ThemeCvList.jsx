import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { templateApi } from '../../../api/template/templateApi';
import HeaderOfScreen from '../../Components/HeaderOfScreen/HeaderOfScreen';

export default function ThemeCvList() {
    const navigation = useNavigation()
    const [themeCv, setThemeCv] = React.useState([])
    const fetchThemeCv = async () => {
        const res = await templateApi.getAllTemplates()

        if (res && res.data && res.data.status === 200) {
            setThemeCv(res.data.data)
        }
    }

    useEffect(() => {
        fetchThemeCv()
    }, [])
    return (
        <View style={styles.container}>
            <HeaderOfScreen title="Chọn mẫu CV" />
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
                                    height: 200,
                                    borderWidth: 0.3,
                                    borderRadius: 3,
                                    margin: 10,
                                    borderColor: '#97E7E1',
                                    backgroundColor: '#DFF5F3',
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
                                            navigation.navigate(
                                                'PDFScreen',
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
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </View>
        </View >

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
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        zIndex: 100,
    }
})