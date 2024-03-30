import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import { authCandidate } from '../../api/candidate/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../App';
import { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function LoginScreeForEmailAndPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    const {auth, setAuth} = useContext(AuthContext);

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
        <LinearGradient colors={["#1DB954", "#040306"]} style={{ flex: 1 }}>

            <View style={styles.container}>
                <Text style={styles.title}>
                    Welcome to JOBS
                </Text>

                <View style={{
                    backgroundColor: "#1DB954",
                    padding: 10,
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: 100,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    marginVertical: 10,
                    marginTop: 40
                }}>
                    <Entypo name="spotify-with-circle" size={80} color="white" />
                </View>

                <View style={{
                    marginTop: 20
                }}>
                    <View style={styles.item}>
                        <Entypo name='email' size={24} color='white' />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="white"
                            style={styles.input}
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                        />
                    </View>

                    <View style={styles.item}>
                        <Entypo name='lock' size={24} color='white' />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="white"
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>

                </View>

                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Checkbox   
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={toggleCheckbox}
                        color="white"
                    />
                    <Text style={{ color: "white" }}>
                        Please select to agree to our terms
                    </Text>
                </View>
            
                <TouchableOpacity
                    style={{
                        width: '100%',
                        padding: 20,
                    }}
                    onPress={handleLogin}
                    disabled={!checked}
                >
                    <Text style={styles.button}>
                        Login
                    </Text>
                </TouchableOpacity>

                <Text style={{ color: "white", textAlign: "center", fontSize: 12, textDecorationLine: 'underline' }}>
                    Forgot Password?
                </Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 100,
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
        marginVertical: 10,
        color: "white"
    },
    button: {
        backgroundColor: "#1DB954",
        padding: 10,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 25,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'white',
        marginTop: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    }
})