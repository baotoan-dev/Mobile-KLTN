import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function ListJobOfAllNewest({
    listJob,
    handleLoadMore,
    isOver
}) {
    return (
        <FlatList
            data={listJob}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={1}
            ListFooterComponent={() => {
                return (
                    isOver ? <Text style={{ textAlign: 'center', padding: 10 }}>Hết dữ liệu</Text> : <ActivityIndicator size="large" color="#0000ff" />
                )
            }}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        style={styles.item}
                    >
                        <View style={styles.left}>
                            <Image
                                source={(item.image) ? { uri: item.image } : require('../../../../../images/default_image.png')}
                                style={{
                                    width: 80,
                                    height: 80
                                }}
                            />
                        </View>
                        <View style={styles.center}>
                            <View>
                                <Text
                                    style={styles.title}
                                    numberOfLines={1}
                                >
                                    {item.title}
                                </Text>
                                <Text>
                                    {item.companyName}
                                </Text>
                            </View>
                            <Text style={styles.salary}>
                                {
                                    item.salaryMin === 0 && item.salaryMax === 0 ? 'Thương lượng' : (
                                        item.salaryMin > 1000 && item.salaryMax > 1000 ? `${item.salaryMin / 10000000} - ${item.salaryMax / 10000000} triệu` : `${item.salaryMin} - ${item.salaryMax} nghìn`
                                    )
                                }
                            </Text>
                        </View>
                        <View style={styles.right}>
                            {
                                item.bookmarked ? <Ionicons name="bookmark" size={24} color="black" /> : <Ionicons name="bookmark-outline" size={24} color="black" />
                            }
                        </View>

                    </TouchableOpacity>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#9AC8CD',
        margin: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    left: {
        width: '20%',
    },
    center: {
        width: '70%',
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    right: {
        width: '10%',
    },
    salary: {
        backgroundColor: '#9AC8CD',
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
    }
})