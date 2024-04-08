import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import { authCandidate } from '../../api/candidate/auth';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreeForEmailAndPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { auth, setAuth } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const handleLogin = async () => {
        try {
            // baotoandd2016@gmail.com

            const response = await authCandidate.signInCandidate(email, password);

            if (response.code === 200) {
                SecureStore.setItemAsync("token", response.data.accessToken);
                SecureStore.setItemAsync("refreshToken", response.data.refreshToken);
                console.log("Login success");
                setAuth(true);
            }
            else {
                console.log("Login failed");
            }
        } catch (error) {
            throw error;
        }
    }
    return (
        <View style={styles.container}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: windowHeight > 890 ? '45%' : '40%',
            }}>
                <Image source={require('../../images/login.jpg')}
                    style={{
                        textAlign: 'center',
                        width: '100%',
                        height: '100%',
                        marginTop: 30,
                        borderRadius: 20,
                        objectFit: 'contain',
                    }}>
                </Image>
            </View>
            <Text style={styles.title}>
                Login
            </Text>


            <View style={{
                marginTop: 10,
                paddingHorizontal: 20,
            }}>
                <View style={styles.item}>
                    <Entypo name='email' size={24} color='black' />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="black"
                        style={styles.input}
                        onChangeText={(text) => {
                            setEmail(text)
                        }}
                    />
                </View>

                <View style={styles.item}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Entypo name='lock' size={24} color='black' style={{
                            marginRight: 10,
                        }} />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="black"
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={showPassword ? false : true}
                        />
                    </View>
                    <TouchableOpacity onPress={() => {
                        setShowPassword(!showPassword);
                    }}>
                        {
                            showPassword ? <Entypo name='eye' size={24} color='black' /> : <Entypo name='eye-with-line' size={24} color='black' />
                        }
                    </TouchableOpacity>
                </View>

            </View>

            <TouchableOpacity style={{ marginTop: 10, paddingHorizontal: 20 }}>
                <Text style={{
                    textAlign: "right",
                    color: "rgba(52, 14, 231, 0.56)"
                }}>
                    Quên mật khẩu ?
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    width: '100%',
                    padding: 20,
                }}
                onPress={handleLogin}
            >
                <Text style={styles.button}>
                    Login
                </Text>
            </TouchableOpacity>

            <Text style={{
                color: "black",
                textAlign: "center",
                marginTop: 10,
            }}>
                OR
            </Text>

            <TouchableOpacity
                style={{
                    width: '100%',
                    padding: 20,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(213, 213, 214, 0.56)',
                    padding: 10,
                    borderRadius: 10,
                }}>
                    <View >
                        <Image source={require('../../images/google.png')}
                            style={{
                                width: 24,
                                height: 24,
                                marginRight: 10,
                            }}
                        >
                        </Image>
                    </View>
                    <Text style={{
                        color: 'black',
                    }}>
                        Đăng nhập bằng google
                    </Text>
                </View>
            </TouchableOpacity>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
            }}>
                <Text style={{
                    color: 'black',
                }}>
                    Bạn chưa có tài khoản ?
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        console.log("Register");
                    }}
                >
                    <Text style={{
                        color: 'rgba(52, 14, 231, 0.56)',
                        marginLeft: 5,
                    }}>
                        Đăng ký
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 20,
        paddingHorizontal: 20,
        fontStyle: "italic"
    },
    input: {
        marginLeft: "auto",
        marginRight: "auto",
        width: 300,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "black",
        marginVertical: 10,
        color: "black"
    },
    button: {
        backgroundColor: "rgba(0, 3, 255, 0.56)",
        padding: 12,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        width: '100%',
        color: "white",
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'black',
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    }
})