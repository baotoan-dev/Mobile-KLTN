import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export default function AddCertification() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginLeft: 5,
                    }}>Thêm chứng chỉ
                </Text>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: 'blue',
                }}>
                    Lưu
                </Text>
            </View>
            <View style={styles.content}>
                {/* company */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>Tên chứng chỉ</Text>
                        <FontAwesome name="asterisk" size={10} color="red" style={{
                            marginLeft: 5,
                        }} />
                    </View>
                    <View style={styles.input}>
                        <Ionicons name="school-outline" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Tên chứng chỉ"
                        >
                        </TextInput>
                    </View>
                </View>
                {/* position */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>Tổ chức</Text>
                        <FontAwesome name="asterisk" size={10} color="red" style={{
                            marginLeft: 5,
                        }} />
                    </View>
                    <View style={styles.input}>
                        <AntDesign name="creditcard" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Tổ chức"
                        >
                        </TextInput>
                    </View>
                </View>
                {/* Start time */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>Thời gian bắt đầu</Text>
                    </View>
                    <View style={styles.input}>
                        <Entypo name="back-in-time" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Thời gian bắt đầu"
                        >
                        </TextInput>
                    </View>
                </View>
                {/* End time */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>Thời gian kết thúc</Text>
                    </View>
                    <View style={styles.input}>
                        <Entypo name="back-in-time" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Thời gian kết thúc"
                        >
                        </TextInput>
                    </View>
                </View>
                {/* description */}
                <View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 10,
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>Mô tả</Text>
                    </View>
                    <View style={styles.input}>
                        <AntDesign name="folderopen" size={24} color="black" />
                        <TextInput
                            style={{
                                marginLeft: 5,
                            }}
                            placeholder="Mô tả"
                        >
                        </TextInput>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        height: 70,
        justifyContent: 'space-between',
    },
    content: {
        padding: 10
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.2,
        padding: 5,
        borderRadius: 5,
        marginTop: 10,
    }
})