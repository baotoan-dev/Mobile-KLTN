import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import HeaderOfScreen from '../Components/HeaderOfScreen/HeaderOfScreen'
import { MaterialIcons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
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
            style={{
              marginLeft: 5,
              width: '100%',
            }}
            placeholder='Nhập email của bạn'
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={{
          color: '#fff'
        }}>
          Tạo mật khẩu mới
        </Text>
      </TouchableOpacity>
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
    paddingHorizontal: 10
  },
  input: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#242670',
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'rgba(0, 3, 255, 0.56)',
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