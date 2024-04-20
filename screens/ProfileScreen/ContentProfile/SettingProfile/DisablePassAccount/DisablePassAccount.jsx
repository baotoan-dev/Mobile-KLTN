import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileAction } from '../../../../../redux/store/Profile/profileSilce';
import { FontAwesome } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

export default function DisablePassAccount() {
    const profile = useSelector(state => state.profile.profile);
    const [email, setEmail] = useState('');
    const [value, setValue] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        dispatch(getProfileAction('vi'));
    }, [])

    useEffect(() => {
        if (profile && profile.email) {
            setEmail(profile.email);
        }
    }, [profile])

    return (
        <View style={{
            flex: 1,
        }}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{
                        justifyContent: 'center',
                        fontSize: 15,
                        marginLeft: 5,
                        fontWeight: 'bold'
                    }}>
                        Vô hiệu hóa tài khoản
                    </Text>
                </View>
                <View style={styles.content}>
                    <View style={{
                        width: '10%'
                    }}>
                        <Entypo name="warning" size={24} color="red" />
                    </View>
                    <View style={{
                        width: '90%'
                    }}>
                        <Text style={{
                            color: 'red',
                            textAlign: 'justify',
                            lineHeight: 20
                        }}>
                            Khi bạn vô hiệu hóa tài khoản, bạn sẽ không thể đăng nhập hoặc nhận thông báo từ chúng tôi.
                            Hãy chắc chắn rằng bạn muốn vô hiệu hóa tài khoản của mình.
                            Chúng tôi sẽ lưu trữ dữ liệu của bạn trong vòng 30 ngày kể từ ngày vô hiệu hóa tài khoản.
                        </Text>
                    </View>
                </View>
                <View style={styles.extra}>
                    <Text style={{
                        lineHeight: 20,
                    }}>
                        Nếu bạn vẫn muốn vô hiệu hóa tài khoản, hãy nhập mật khẩu của bạn để xác nhận
                    </Text>

                    <View>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 5,
                            }}>
                                <Text style={styles.title}>
                                    Email
                                </Text>
                                <View>
                                    <FontAwesome name="asterisk" size={10} color="red" />
                                </View>
                            </View>
                            <TextInput
                                editable={false}
                                selectTextOnFocus={false}
                                value={email}
                                style={{
                                    borderWidth: 0.2,
                                    borderColor: 'gray',
                                    borderRadius: 3,
                                    backgroundColor: '#D6DAC8',
                                    padding: 3,
                                    paddingHorizontal: 10,
                                }}
                            ></TextInput>
                        </View>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 5,
                            }}>
                                <Text style={styles.title}>
                                    Mật khẩu
                                </Text>
                                <View>
                                    <FontAwesome name="asterisk" size={10} color="red" />
                                </View>
                            </View>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                                placeholder='Nhập mật khẩu...'
                                style={{
                                    borderWidth: 0.2,
                                    borderColor: 'gray',
                                    borderRadius: 3,
                                    padding: 3,
                                    paddingHorizontal: 10,
                                }}
                            ></TextInput>
                        </View>
                    </View>
                </View>
                <View style={styles.reason}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 5,
                    }}>
                        <Text style={styles.title}>
                            Lý do vô hiệu hóa tài khoản
                        </Text>
                        <View>
                            <FontAwesome name="asterisk" size={10} color="red" />
                        </View>
                    </View>
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderColor: value === 'first' ? 'red' : 'gray',
                            borderRadius: 5,
                            padding: 5,
                        }}>
                            <RadioButton value="first" />
                            <Text>
                                Tôi đã có tài khoản khác
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderColor: value === 'second' ? 'red' : 'gray',
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 10,
                        }}>
                            <RadioButton value="second" />
                            <Text>
                                Tôi không muốn sử dụng tài khoản này nữa
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderColor: value === 'third' ? 'red' : 'gray',
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 10,
                        }}>
                            <RadioButton value="third" />
                            <Text>
                                Tôi muốn tạo tài khoản nhà tuyển dụng
                            </Text>
                        </View>
                    </RadioButton.Group>

                </View>
                <View style={styles.footer}>
                    <Text style={{
                        lineHeight: 20,
                    }}>
                        Trong trường hợp bạn muốn mở lại tài khoản, vui lòng liên hệ với chúng tôi qua email:
                        <Text>
                            <Text style={{
                                color: 'blue'
                            }}>
                                job@gmail.com
                            </Text>
                        </Text>
                    </Text>
                </View>
            </ScrollView>
            <View style={{
                paddingHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TouchableOpacity style={{
                    backgroundColor: 'red',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 10,
                    width: '100%',
                    borderRadius: 5,
                }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 15,
                        textAlign: 'center'
                    }}>
                        Vô hiệu hóa tài khoản
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        paddingTop: 30,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    content: {
        width: '100%',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#FFDFDF'
    },
    extra: {
        padding: 20,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginVertical: 5,
        marginRight: 5,
    },
    reason: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    footer: {
        paddingHorizontal: 20,
        lineHeight: 20,
    }
})