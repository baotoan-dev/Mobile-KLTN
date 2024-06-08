import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('') 
  const handleForgotPassword = () => {
    if (email === '') {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Lỗi',
        text2: 'Vui lòng nhập email của bạn',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 90,
        bottomOffset: 100,
      });
      return;
    }
  }
  return (
    <View style={styles.container}>
      <HeaderOfScreen title='' />
      <View style={styles.p10}>
        <Text style={styles.title}>Quên mật khẩu</Text>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image source={require('../../images/forgot-password.png')} style={{
            width: 150,
            height: 150,
            marginVertical: 20,
            marginVertical: 40
          }} />
        </View>
        <Text style={{
          marginTop: 10,
          lineHeight: 20
        }}>
          Vui lòng nhập email của bạn để lấy lại mật khẩu. Chúng tôi sẽ gửi mật khẩu mới vào email của bạn.
        </Text>
        <View style={styles.input}>
          <MaterialIcons name="alternate-email" size={24} color="black" />
          <TextInput
            onChangeText={setEmail}
            style={{
              marginLeft: 5,
              width: '100%',
              height: '100%',
              fontWeight: 'bold'
            }}
            placeholder='Nhập email của bạn'
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VerifyOTP')
          handleForgotPassword()
        }}
        style={styles.button}>
        <Text style={{
          color: '#fff'
        }}>
          Tạo mật khẩu mới
        </Text>
      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: 'bold',
  },
  p10: {
    paddingHorizontal: 10,
  },
  input: {
    marginTop: 30,
    borderRadius: 5,
    padding: 10,
    height: 50,
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
  button: {
    backgroundColor: '#789292',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45
  }
})