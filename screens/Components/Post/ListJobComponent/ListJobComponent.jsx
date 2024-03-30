import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ListJobComponent({ listJob }) {

    const navation = useNavigation();

    return (
        <View>
            {
                listJob && listJob.length > 0 && (
                    <FlatList
                        data={listJob}
                        horizontal={false}
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
                                            {item.company_name}
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
                                                {item.district_name}
                                            </Text>
                                            <Text style={{
                                                marginLeft: 10,
                                                fontSize: 12,
                                                borderWidth: 0.2,
                                                borderRadius: 4,
                                                padding: 3,
                                                backgroundColor: '#f0f0f0',
                                            }}>
                                                {item.job_type.job_type_name}
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
        width: '80%',
        height: '100%',
        borderWidth: 0.5,
        borderColor: 'black',
        borderRadius: 18,
    }
})