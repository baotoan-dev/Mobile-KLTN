import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function Information({ company }) {
    return (
        <View style={styles.container}>
            {
                company && (
                    <SafeAreaView>
                        <ScrollView>
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Ionicons name="information-circle" size={24} color="black" style={{
                                        marginRight: 5,
                                    }} />
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                    }}>
                                        Thông tin cơ bản
                                    </Text>
                                </View>
                                <View style={{
                                    paddingHorizontal: 30,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                        alignItems: 'center',
                                    }}>
                                        <Foundation name="web" size={22} color="gray" style={{
                                            marginRight: 5,
                                        }} />
                                        <Text style={{
                                            marginRight: 2
                                        }}>Trang web:</Text>
                                        <Text style={{
                                            color: 'blue',
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                        }}>{company?.website}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 20,
                                        alignItems: 'center',
                                    }}>
                                        <AntDesign name="codesquareo" size={22} color="black" style={{
                                            marginRight: 5,
                                        }} />
                                        <Text style={{
                                            marginRight: 2
                                        }}>Mã số thuể:</Text>
                                        <Text style={{
                                            color: 'blue',
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                        }}>{company?.tax ? company.tax : 'Chưa cập nhật'}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 20,
                                        alignItems: 'center',
                                    }}>
                                        <MaterialIcons name="alternate-email" size={22} color="black" style={{
                                            marginRight: 5,
                                        }} />
                                        <Text style={{
                                            marginRight: 2
                                        }}>Email:</Text>
                                        <Text style={{
                                            color: 'blue',
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                        }}>{company?.email}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 20,
                                        alignItems: 'center',
                                    }}>
                                        <Feather name="phone" size={22} color="black" style={{
                                            marginRight: 5,
                                        }} />
                                        <Text style={{
                                            marginRight: 2
                                        }}>Điện thoại:</Text>
                                        <Text style={{
                                            color: 'blue',
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                        }}>{company?.phone}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 20,
                                        alignItems: 'center',
                                    }}>
                                        <MaterialIcons name="category" size={24} color="black" style={{
                                            marginRight: 5,
                                        }} />
                                        <Text style={{
                                            marginRight: 2
                                        }}>Ngành nghề:</Text>
                                        <Text style={{
                                            color: 'blue',
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                        }}>{company?.categoryData}</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        marginTop: 20,
                                        alignItems: 'center',
                                    }}>
                                        <MaterialIcons name="category" size={24} color="black" style={{
                                            marginRight: 5,
                                        }} />
                                        <Text style={{
                                            marginRight: 2
                                        }}>Quy mô công ty:</Text>
                                        <Text style={{
                                            color: 'blue',
                                            fontStyle: 'italic',
                                            fontWeight: 'bold',
                                        }}>{company?.companySizeInfomation ? company.companySizeInfomation.nameText : 'Chưa cập nhật'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}>
                                    <MaterialIcons style={{
                                        marginRight: 5,
                                    }} name="description" size={24} color="black" />
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                    }}>
                                        Mô tả
                                    </Text>
                                </View>
                                <Text style={{
                                    marginTop: 10,
                                    paddingHorizontal: 30,
                                }}>{company?.description}</Text>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: '100%',
    }
})