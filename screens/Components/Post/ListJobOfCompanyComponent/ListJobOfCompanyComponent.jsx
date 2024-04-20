import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
export default function ListJobOfCompanyComponent({
    listJob, setCurrentPage, isOver
}) {

    const navation = useNavigation();

    const renderLoader = () => {
        return (
            isOver ? (
                <View>
                    <Text></Text>
                </View>
            ) : (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        );
    };

    const loadMoreItem = () => {
        if (!isOver) {
            setCurrentPage((prev) => prev + 1)
        }
    }

    return (
        <View>
            {
                listJob && listJob.lenght > 0 ? (
                    <FlatList
                        data={listJob}
                        horizontal={false}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={1}
                        ListFooterComponent={renderLoader}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navation.navigate('PostDetail', {
                                        id: item.id
                                    })
                                }}
                                style={{
                                    padding: 10,
                                    borderBottomColor: '#d3d3d3',
                                    borderBottomWidth: 0.7,
                                }}>
                                <View style={styles.item}>
                                    <View style={styles.left}>
                                        <Image source={{ uri: item.image }} style={styles.logo} />
                                    </View>
                                    <View style={styles.center}>
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                fontWeight: 'bold',
                                            }}>
                                            {item.title}
                                        </Text>
                                        <Text>
                                            {item.companyName}
                                        </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginTop: 5,
                                        }}>
                                            <Text style={{
                                                fontSize: 12,
                                                borderWidth: 0.2,
                                                borderRadius: 4,
                                                padding: 3,
                                                backgroundColor: '#f0f0f0',
                                            }}>
                                                {item?.location?.ward.fullName}
                                            </Text>
                                            <Text style={{
                                                marginLeft: 10,
                                                fontSize: 12,
                                                borderWidth: 0.2,
                                                borderRadius: 4,
                                                padding: 3,
                                                backgroundColor: '#f0f0f0',
                                            }}>
                                                {item.jobType.name}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.right}>
                                        <Feather name="bookmark" size={24} color="black" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />
                ) :
                    (
                        <View style={{
                            flex: 1,
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 50
                        }}>
                            <AntDesign name="aliwangwang-o1" size={24} color="black" />
                            <Text style={{
                                marginTop: 10,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                Không tìm thấy công việc
                            </Text>
                        </View>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        flexDirection: 'row',
        borderWidth: 0.2,
        borderColor: 'gray',
        borderRadius: 10,
    },
    left: {
        width: '30%',
        height: 100,
        padding: 10,
    },
    center: {
        width: '60%',
        height: 100,
        marginTop: 10,
    },
    right: {
        width: '10%',
        height: 100,
        marginTop: 10
    },
    logo: {
        width: '90%',
        height: '100%',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
    }
})