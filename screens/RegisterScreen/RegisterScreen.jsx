import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { Fontisto } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [isCheckShowPassword, setIsCheckShowPassword] = React.useState(false)
  const [isCheckShowRePassword, setIsCheckShowRePassword] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rePassword, setRePassword] = React.useState('')
  const [isCheckPolicy, setIsCheckPolicy] = React.useState(false)

  const handleRegister = () => {
    if (!isCheckPolicy) {
      ToastAndroid.show('Vui lòng đồng ý với điều khoản sử dụng', ToastAndroid.SHORT)
      return
    }
    if (name === '' || email === '' || password === '' || rePassword === '') {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.SHORT)
      return
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={{ uri: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711324800&semt=sph' }}
          style={styles.logo}
        />
        <Text style={styles.title}>
          Chào mừng bạn đến với JOBS
        </Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.titleRegister}>
          Đăng ký tài khoản
        </Text>
        <View style={styles.group}>
          <View style={styles.item}>
            <Fontisto name="person" size={24} color="black" />
            <TextInput
              style={styles.ml}
              placeholder='Họ và tên'
              onChangeText={(text) => {
                setName(text)
              }}
            />
          </View>
          <View style={styles.item}>
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput
              style={styles.ml}
              placeholder='Email'
              onChangeText={(text) => {
                setEmail(text)
              }}
            />
          </View>
          <View style={[styles.item, {
            justifyContent: 'space-between'
          }]}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Fontisto name="locked" size={24} color="black" />
              <TextInput
                style={styles.ml}
                placeholder='Mật khẩu'
                secureTextEntry={!isCheckShowPassword}
                onChangeText={(text) => {
                  setPassword(text)
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsCheckShowPassword(!isCheckShowPassword)
              }}
            >
              {
                isCheckShowPassword ? <FontAwesome name="eye-slash" size={24} color="black" /> : <FontAwesome name="eye" size={24} color="black" />
              }
            </TouchableOpacity>

          </View>
          <View style={[styles.item, {
            justifyContent: 'space-between'
          }]}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Fontisto name="locked" size={24} color="black" />
              <TextInput
                style={styles.ml}
                placeholder='Nhập lại mật khẩu'
                secureTextEntry={!isCheckShowRePassword}
                onChangeText={(text) => {
                  setRePassword(text)
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsCheckShowRePassword(!isCheckShowRePassword)
              }}
            >
              {
                isCheckShowRePassword ? <FontAwesome name="eye-slash" size={24} color="black" /> : <FontAwesome name="eye" size={24} color="black" />
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <CheckBox
          title='Tôi đồng ý với điều khoản sử dụng'
          checked={isCheckPolicy}
          onPress={() => {
            setIsCheckPolicy(!isCheckPolicy)
          }}
        />
        <TouchableOpacity
          onPress={() => {
            handleRegister()
          }}
          style={{
            width: '80%',
            marginTop: 20
          }}>
          <Text style={[styles.btnRegister, {
            backgroundColor: isCheckPolicy ? 'rgba(52, 14, 231, 1)' : 'rgba(52, 14, 231, 0.5)'
          }]}>
            Đăng ký
          </Text>
        </TouchableOpacity>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20
        }}>
          <Text style={{
            textAlign: 'center',
          }}>
            Bạn đã có tài khoản?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('LoginEmailAndPassword')
            }}
            style={{
              marginLeft: 5
            }}>
            <Text style={{
              color: 'rgba(52, 14, 231, 1)',
              fontWeight: 'bold'
            }}>
              Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 50
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  center: {
    flex: 1,
    marginTop: 30
  },
  titleRegister: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 14, 231, 0.1)',
    borderRadius: 20,
    marginBottom: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  group: {
    paddingHorizontal: 30,
  },
  ml: {
    marginLeft: 10
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  btnRegister: {
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})