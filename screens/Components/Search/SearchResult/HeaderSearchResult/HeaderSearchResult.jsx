import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function HeaderSearchResult() {
    const navigation = useNavigation();
    const dataFilter = [
      {
        title: 'Mức lương',
        id: 1,
      },
      {
        title: 'Ngành nghề',
        id: 2,
      },
    ]
    return (
        <View style={{
            backgroundColor: 'white',
        }}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    paddingHorizontal: 20,
                    marginBottom: 10,
                }}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
            <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    borderRadius: 5,
                    backgroundColor: 'white',
                    borderWidth: 0.2,
                    marginHorizontal: 20,
                    padding: 6,
                    marginBottom: 10,
                }}>
                    <EvilIcons name="search" size={24} color="black" />
                    <TextInput
                        placeholder="Tìm kiếm"
                    />
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingVertical: 10,
                paddingHorizontal: 20,
                width: '100%',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '30%',
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Filter')}
                        style={{
                            borderWidth: 1,
                            padding: 5,
                            borderColor: 'gray',
                            borderRadius: 20,
                            marginRight: 10,
                        }}>
                        <AntDesign name="filter" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{
                        borderRightWidth: 1,
                        paddingRight: 10,
                        borderColor: 'gray',
                    }}>
                        <Text>Lọc</Text>
                    </View>
                </View>
                <View
                    style={{
                        width: '70%',
                    }}
                >
                    <FlatList
                        data={dataFilter}
                        horizontal={true}
                        renderItem={({ item }) => (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                padding: 5,
                                borderRadius: 5,
                                marginRight: 10,
                                borderWidth: 0.2,
                            }}>
                                <Text>{item.title}</Text>
                                <AntDesign name="caretdown" size={16} color="black" style={{
                                    marginLeft: 5,
                                }} />
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    )
}