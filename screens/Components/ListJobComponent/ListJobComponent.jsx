import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView, FlatList, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { FontAwesome } from '@expo/vector-icons';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
import { useNavigation } from '@react-navigation/native';

export default function ListJobComponent({
    listJob,
    isOver,
    handleDeleteBookmark,
    isShow,
    isApply
}) {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <FlatList
                data={listJob}
                keyExtractor={(item) => item.id}
                ListFooterComponent={() => {
                    if (!isOver) {
                        return (
                            <LoaderComponent />
                        )
                    }
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('PostDetail', {
                                    id: item.id
                                })
                            }}
                            style={styles.item}
                        >
                            <View style={styles.flexRow}>
                                <View style={{
                                    width: '25%',
                                }}>
                                    <Animated.Image
                                        source={{ uri: item.image ? item.image : 'https://reactnative.dev/img/tiny_logo.png' }}
                                        style={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: 10
                                        }}
                                    />
                                </View>
                                <View style={{
                                    width: '70%',
                                }}>
                                    <Text
                                        style={styles.title}
                                        numberOfLines={1}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text style={styles.nameCompany}>
                                        {item.company_name}
                                    </Text>
                                    <View style={styles.extraInfor}>
                                        <View style={styles.boderExtra}>
                                            <Text style={{
                                                color: 'gray',
                                                fontSize: 12
                                            }}>
                                                {
                                                    item.district_name
                                                }
                                            </Text>
                                        </View>
                                        <View style={[{
                                            marginLeft: 10
                                        }, styles.boderExtra]}>
                                            <Text style={{
                                                color: 'gray',
                                                fontSize: 12
                                            }}>
                                                {
                                                    item.salary_min && item.salary_max ? `${item.salary_min > 1000000 ? item.salary_min / 1000000 + 'tr' : item.salary_min} - ${item.salary_max > 1000000 ? item.salary_max / 1000000 + 'tr' : item.salary_max}` : 'Thương lượng'
                                                }
                                            </Text>
                                        </View>
                                        {
                                            isApply && (
                                                <View style={[{
                                                    marginLeft: 10
                                                }, {
                                                    borderColor: '#97E7E1',
                                                    borderWidth: 0.5,
                                                    padding: 2,
                                                    borderRadius: 4,
                                                    marginTop: 5,
                                                    backgroundColor: item.application_status === 1 ? '#97E7E1' : item.application_status === 2 ? 'green' : item.application_status === 3 ? 'red' : 'blue'
                                                }]}>
                                                    <Text
                                                        style={{
                                                            color: 'gray',
                                                            fontSize: 12
                                                        }}>
                                                        {
                                                            item.application_status === 1 && 'Đã ứng tuyển'
                                                        }
                                                        {
                                                            item.application_status === 2 && 'Đã được duyệ'
                                                        }
                                                        {
                                                            item.application_status === 3 && 'Đã từ chối'
                                                        }
                                                        {
                                                            item.application_status === 4 && 'Đã được tuyển'
                                                        }
                                                    </Text>
                                                </View>
                                            )
                                        }
                                    </View>
                                </View>
                            </View>
                            {
                                isShow && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleDeleteBookmark(item.id)
                                        }}
                                        style={{
                                            width: '5%',
                                        }}>
                                        {
                                            <FontAwesome name="bookmark" size={24} color="black" />
                                        }
                                    </TouchableOpacity>
                                )
                            }
                        </TouchableOpacity>
                    )
                }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    },
    item: {
        marginVertical: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderColor: '#97E7E1',
        borderWidth: 0.5,
        shadowColor: '#97E7E1',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
        width: '100%'
    },
    flexRow: {
        flexDirection: 'row',
        width: '95%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14
    },
    nameCompany: {
        fontSize: 12,
        color: 'gray'
    },
    extraInfor: {
        flexDirection: 'row',
    },
    boderExtra: {
        borderColor: '#97E7E1',
        borderWidth: 0.5,
        padding: 2,
        borderRadius: 4,
        backgroundColor: '#97E7E1',
        marginTop: 5
    }
}) 