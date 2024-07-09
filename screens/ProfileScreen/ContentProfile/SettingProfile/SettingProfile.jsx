import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingProfile({profile}) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cài đặt tài khoản</Text>
            <View>
                <TouchableOpacity style={styles.item} onPress={() => {
                     if (profile.isActive === 0) {
                        ToastAndroid.showWithGravity(
                            "Tài khoản chưa được kích hoạt",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                          );
                          setTimeout(() => {
                            navigation.navigate("ActiveAccount", {
                              email: profile.email,
                            });
                          }, 2000);
                        return  
                    }
                    navigation.navigate('ModifyPassword');
                }}>
                    <Text>Đổi mật khẩu</Text>
                    <MaterialIcons name="navigate-next" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => {
                     if (profile.isActive === 0) {
                        ToastAndroid.showWithGravity(
                            "Tài khoản chưa được kích hoạt",
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                          );
                          setTimeout(() => {
                            navigation.navigate("ActiveAccount", {
                              email: profile.email,
                            });
                          }, 2000);
                        return  
                    }
                    navigation.navigate('DisablePassAccount');
                }}>
                    <Text>Vô hiệu hóa tài khoản</Text>
                    <MaterialIcons name="navigate-next" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#242670',
    },
    item: {
        borderBottomColor: 'gray',
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})