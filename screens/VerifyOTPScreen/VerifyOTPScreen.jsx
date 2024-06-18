import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useRef } from 'react';
import Toast from 'react-native-toast-message';
import { authCandidate } from '../../api/candidate/auth';

export default function VerifyOTPScreen(prop) {
    const { email } = prop.route.params;
    const [newEmail, setNewEmail] = React.useState(email);
    const [isClickModify, setIsClickModify] = React.useState(false);
    const navigation = useNavigation();

    // hide header
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const inputEmailRef = useRef(null);

    const [codeOfInput1, setCodeOfInput1] = React.useState('')
    const [codeOfInput2, setCodeOfInput2] = React.useState('')
    const [codeOfInput3, setCodeOfInput3] = React.useState('')
    const [codeOfInput4, setCodeOfInput4] = React.useState('')

    const focusNextInput = (nextInputRef) => {
        nextInputRef.current && nextInputRef.current.focus();
    };

    useEffect(() => {
        setNewEmail(email)
    }, [email])

    useEffect(() => {
        if (isClickModify) {
            inputEmailRef.current && inputEmailRef.current.focus();
        }
    }, [isClickModify]);

    const handleSubmitOtp = async () => {
        console.log('vao day');
        const otp = codeOfInput1 + codeOfInput2 + codeOfInput3 + codeOfInput4;

        const res = await authCandidate.confirmOtpApp(newEmail, otp);

        if (res.data.statusCode === 200) {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Thành công',
                text2: 'Xác nhận OTP thành công',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 90,
                bottomOffset: 100,
            });
            navigation.navigate('ResetPassword', {
                email: newEmail
            })
        }
        else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Lỗi',
                text2: 'Mã xác nhận không đúng',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 90,
                bottomOffset: 100,
            });
            return;
        }
    }

    const handleResendOtp = async () => {
        const res = await authCandidate.forgotPaswordApp(newEmail);

        if (res.data.statusCode === 200) {
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Thành công',
                text2: 'Vui lòng kiểm tra email của bạn',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 90,
                bottomOffset: 100,
            });
        }
    }

    return (
        <View style={styles.container}>
            <View style={{
                marginTop: 20,
            }}>
                <View style={{
                    marginBottom: 20,
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                    >
                        <Ionicons name="chevron-back-circle" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                <Image
                    source={require('../../assets/images/Vector.png')}
                    style={styles.logo}
                />
            </View>
            <View style={{
                alignItems: 'center',
            }}>
                <Text style={{
                    fontSize: 27,
                    fontWeight: 'bold',
                    marginBottom: 20
                }}>
                    Mã xác nhận
                </Text>
                <Text style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'gray'
                }}>
                    Lưu ý: Vui lòng nhập mã xác nhận đã được gửi đến email của bạn
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                marginTop: 30,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextInput
                    ref={inputEmailRef}
                    editable={isClickModify}
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'gray'
                    }}>
                    {
                        newEmail
                    }
                </TextInput>
                <TouchableOpacity
                    onPress={() => {
                        setIsClickModify(!isClickModify)
                    }}
                >
                    <Image
                        source={require('../../assets/images/modify.png')}
                        style={{
                            width: 28,
                            height: 28,
                            marginLeft: 10
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 30
                }}>
                    <TextInput
                        ref={input1Ref}
                        style={styles.input}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={(text) => {
                            setCodeOfInput1(text);
                            if (text !== '') {
                                focusNextInput(input2Ref);
                            }
                        }}
                    />
                    <TextInput
                        ref={input2Ref}
                        style={styles.input}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={(text) => {
                            setCodeOfInput2(text);
                            if (text === '') {
                                focusNextInput(input1Ref);
                            } else {
                                focusNextInput(input3Ref);
                            }
                        }}
                    />
                    <TextInput
                        ref={input3Ref}
                        style={styles.input}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={(text) => {
                            setCodeOfInput3(text);
                            if (text === '') {
                                focusNextInput(input2Ref);
                            } else {
                                focusNextInput(input4Ref);
                            }
                        }}
                    />
                    <TextInput
                        ref={input4Ref}
                        style={styles.input}
                        maxLength={1}
                        keyboardType='numeric'
                        onChangeText={(text) => {
                            setCodeOfInput4(text);
                            if (text === '') {
                                focusNextInput(input3Ref);
                            }
                        }}
                    />
                </View>
            </View>
            <View style={{ width: '100%', marginTop: 30 }}>
                <TouchableOpacity
                    onPress={() => {
                        handleSubmitOtp()
                    }}
                    style={{
                        marginTop: 20,
                        alignItems: 'center',
                        width: '100%'
                    }}>
                    <Text style={styles.btnSubmit}>
                        Xác nhận
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    handleResendOtp()
                }}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20
                }}>
                <Text style={{
                    fontSize: 12,
                    color: 'gray',
                    fontWeight: 'bold'
                }}>
                    Gửi lại mã xác nhận
                </Text>
            </TouchableOpacity>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 30,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10
    },
    logo: {
        width: '50%',
        marginBottom: 50,
        alignSelf: 'center'
    },
    input: {
        width: '20%',
        height: 65,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 20,
        backgroundColor: '#DDDDDD',
        textAlign: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnSubmit: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#789292',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        textAlign: 'center'
    }
})