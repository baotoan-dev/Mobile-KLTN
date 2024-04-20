import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

export default function PersonalInformation() {
    const navigation = useNavigation();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [link, setLink] = React.useState('');
    const [intent, setIntent] = React.useState('');
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
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 5,
                }}>Thông tin cá nhân</Text>
            </View>
            <ScrollView style={styles.content}>
                {/* Image */}
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    alignSelf: 'center',
                    marginTop: 20,
                }}>
                    <Image
                        source={{ uri: 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/1-hinh-anh-ngay-moi-hanh-phuc-sieu-cute-inkythuatso-09-13-35-50.jpg' }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            margin: 10,
                            overflow: 'hidden',
                        }}
                    >
                    </Image>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        borderRadius: 50,
                        padding: 5,
                        zIndex: 1000,
                    }}>
                        <MaterialIcons name="camera-alt" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {/* name */}
                <View style={{
                    paddingHorizontal: 10,
                    marginTop: 10,
                }}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Họ và tên
                            </Text>
                            <FontAwesome name="asterisk" size={10} color="red" style={{
                                marginLeft: 5,
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <AntDesign name="user" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập họ và tên..."
                                onChangeText={(text) => {
                                    setName(text);
                                }}
                            />
                        </View>
                    </View>
                    {/* email */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Email
                            </Text>
                            <FontAwesome name="asterisk" size={10} color="red" style={{
                                marginLeft: 5,
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <Fontisto name="email" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập email..."
                                onChangeText={(text) => {
                                    setEmail(text);
                                }}
                            />
                        </View>
                    </View>
                    {/* phone */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Phone
                            </Text>
                            <FontAwesome name="asterisk" size={10} color="red" style={{
                                marginLeft: 5,
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <Fontisto name="phone" size={20} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập số điện thoại..."
                                onChangeText={(text) => {
                                    setPhone(text);
                                }}
                            />
                        </View>
                    </View>
                    {/* address */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Địa chỉ
                            </Text>
                            <FontAwesome name="asterisk" size={10} color="red" style={{
                                marginLeft: 5,
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <FontAwesome name="address-book-o" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập địa chỉ..."
                                onChangeText={(text) => {
                                    setAddress(text);
                                }}
                            />
                        </View>
                    </View>
                    {/* link */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Link
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <FontAwesome name="link" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập link..."
                                onChangeText={(text) => {
                                    setLink(text);
                                }}
                            />
                        </View>
                    </View>
                    {/*  itent */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Mục tiêu
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <FontAwesome name="bullseye" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập mục tiêu..."
                                onChangeText={(text) => {
                                    setIntent(text);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.bottom}>
                <Text style={{
                    fontWeight: 'bold',
                    padding: 10,
                    borderRadius: 5,
                    borderWidth: 0.2,
                    borderColor: 'gray',
                    width: '90%',
                    textAlign: 'center',
                    backgroundColor: '#BED7DC',
                }}>
                    Lưu
                </Text>
            </TouchableOpacity>
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
    },
    content: {
        height: '90%',
    },
    bottom: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})