import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileAction } from '../../../../../redux/store/Profile/profileSilce';

export default function ModifyPassword() {
    const profile = useSelector(state => state.profile.profile);
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');
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

    const handleModifyPassword = () => {
        if (!oldPassword || !newPassword || !reNewPassword) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Ionicons name="arrow-back" size={24} color="#242670" />
                </TouchableOpacity>
                <Text style={{
                    justifyContent: 'center',
                    fontSize: 15,
                    marginLeft: 5,
                    fontWeight: 'bold',
                    color: '#242670',
                }}>
                    Đổi mật khẩu
                </Text>
            </View>
            <View style={styles.content}>
                <View style={{
                    marginTop: 20,
                }}>
                    <Text style={styles.title}>
                        Email của bạn:
                    </Text>
                    <TextInput
                        editable={false}
                        selectTextOnFocus={false}
                        value={email}
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#242670',
                            borderRadius: 5,
                            backgroundColor: '#CCD3CA',
                            padding: 3,
                            paddingHorizontal: 10,
                        }}
                    />
                </View>
                <View style={{
                    marginTop: 20,
                }}>
                    <Text style={styles.title}>
                        Mật khẩu cũ:
                    </Text>
                    <TextInput
                        placeholder='Nhập mật khẩu cũ...'
                        value={oldPassword}
                        secureTextEntry={true}
                        onChangeText={setOldPassword}
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#242670',
                            borderRadius: 5,
                            padding: 3,
                            paddingHorizontal: 10,
                        }}
                    />
                </View>
                <View style={{
                    marginTop: 20,
                }}>
                    <Text style={styles.title}>
                        Mật khẩu mới:
                    </Text>
                    <TextInput
                        placeholder='Nhập mật khẩu mới...'
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#242670',
                            borderRadius: 5,
                            padding: 3,
                            paddingHorizontal: 10,
                        }}
                    />
                </View>
                <View style={{
                    marginTop: 20,
                }}>
                    <Text style={styles.title}>
                        Nhập lại mật khẩu mới:
                    </Text>
                    <TextInput
                        placeholder='Nhập lại mật khẩu mới...'
                        value={reNewPassword}
                        secureTextEntry={true}
                        onChangeText={setReNewPassword}
                        style={{
                            borderWidth: 0.5,
                            borderColor: '#242670',
                            borderRadius: 5,
                            padding: 3,
                            paddingHorizontal: 10,
                        }}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{
                        backgroundColor: 'gray',
                        padding: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '45%',
                        borderRadius: 5,
                    }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}>
                        Hủy
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={handleModifyPassword}
                style={{
                    backgroundColor: '#242670',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '45%',
                    borderRadius: 5,
                }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                    }}>
                        Lưu thay đổi
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingTop: 30,
        paddingHorizontal: 10,
    },
    content: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: 'white',
    }
})