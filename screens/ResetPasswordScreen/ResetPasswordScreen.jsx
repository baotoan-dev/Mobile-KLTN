import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { validatePassword } from '../../utils/Validation';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { authCandidate } from '../../api/candidate/auth';

export default function ResetPasswordScreen(prop) {
    const { email } = prop.route.params
    const navigation = useNavigation()
    const [checkIsValidPassword, setCheckIsValidPassword] = React.useState(false)
    const [checkIsValidRePassword, setCheckIsValidRePassword] = React.useState(false)
    const [newPassword, setNewPassword] = React.useState('')
    const [reNewPassword, setReNewPassword] = React.useState('')

    useEffect(() => {
        const isValidPassword = (password) => {
            return validatePassword(password).isValid
        };

        setCheckIsValidPassword(isValidPassword(newPassword));
    }, [newPassword]);

    useEffect(() => {
        const isValidPassword = (password) => {
            return validatePassword(reNewPassword).isValid
        };

        setCheckIsValidRePassword(isValidPassword(reNewPassword));
    }, [reNewPassword])

    const handleResetPassword = async () => {
        if (newPassword !== reNewPassword) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Lỗi',
                text2: 'Mật khẩu nhập lại không khớp',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 90,
                bottomOffset: 100,
            });
            return;
        }

        try {
            // Call API to reset password

            const res = await authCandidate.resetPasswordApp(email, newPassword);

            if (res.data.statusCode === 200) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Thành công',
                    text2: 'Cập nhật mật khẩu thành công',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 90,
                    bottomOffset: 100,
                });

                // Navigate to login screen after successful reset (within if block)
                setTimeout(() => {
                    navigation.navigate('LoginEmailAndPassword');
                }, 3000);
            } else {
                // Handle API errors (e.g., display error message to user)
                console.error('Password reset failed:', res.data);
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Lỗi',
                    text2: 'Cập nhật mật khẩu thất bại', // Adjust message based on error
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 90,
                    bottomOffset: 100,
                });
            }
        } catch (error) {
            // Handle general errors (e.g., network issues)
            console.error('Error resetting password:', error);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Lỗi',
                text2: 'Có lỗi xảy ra, vui lòng thử lại',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 90,
                bottomOffset: 100,
            });
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AntDesign name="leftcircleo" size={24} color="black" />
                <Text
                    style={[styles.ml5, styles.title]}
                >
                    Cập nhật Password
                </Text>
            </View>
            <View style={styles.content}>
                <Text>
                    Password tối thiểu 6 ký tự, bao gồm chữ cái và số, không chứa ký tự đặc biệt
                </Text>
            </View>
            <View style={styles.content}>
                <View style={styles.input}>
                    <View>
                        <TextInput
                            onChangeText={(text) => {
                                setNewPassword(text)
                            }}
                            secureTextEntry={true}
                            style={{
                                width: '100%',
                                height: '100%',
                                fontWeight: 'bold'
                            }}
                            placeholder='Nhập mật khẩu mới'
                        />
                    </View>
                    {
                        (
                            <View>
                                <AntDesign name="checkcircleo" size={20} color={
                                    checkIsValidPassword ? 'green' : 'red'
                                } />
                            </View>
                        )
                    }
                </View>
                {
                    newPassword !== reNewPassword && (
                        <Text style={{
                            color: 'red',
                            marginTop: 10,
                        }}>
                            Mật khẩu nhập lại không khớp
                        </Text>
                    )
                }
                <View style={styles.input}>
                    <View>
                        <TextInput
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                setReNewPassword(text)
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                fontWeight: 'bold'
                            }}
                            placeholder='Nhập lại mật khẩu mới'
                        />
                    </View>
                    {
                        (
                            <View>
                                <AntDesign name="checkcircleo" size={20} color={
                                    checkIsValidRePassword ? 'green' : 'red'
                                } />
                            </View>
                        )
                    }
                </View>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        handleResetPassword()
                    }}
                    style={styles.btnSubmit}
                >
                    <Text style={{
                        color: '#fff'
                    }}>
                        Cập nhật mật khẩu
                    </Text>
                </TouchableOpacity>
            </View>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    ml5: {
        marginLeft: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        marginTop: 20,
        borderRadius: 5,
        padding: 10,
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    btnSubmit: {
        backgroundColor: '#789292',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    }
})