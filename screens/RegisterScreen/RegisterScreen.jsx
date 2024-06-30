import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Fontisto } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { authCandidate } from '../../api/candidate/auth';

export default function RegisterScreen() {
  const fields = {
    name: 'Vui lòng nhập tên',
    email: 'Vui lòng nhập email',
    password: 'Vui lòng nhập mật khẩu',
    rePassword: 'Vui lòng nhập lại mật khẩu'
  };

  const navigation = useNavigation();
  const [isCheckShowPassword, setIsCheckShowPassword] = React.useState(false)
  const [isCheckShowRePassword, setIsCheckShowRePassword] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rePassword, setRePassword] = React.useState('')
  const [isCheckPolicy, setIsCheckPolicy] = React.useState(false)

  const handleRegister = async () => {
    if (!isCheckPolicy) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Lỗi',
        text2: 'Vui lòng đồng ý với điều khoản sử dụng',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 50,
      });
      return
    }

    const values = { name, email, password, rePassword };

    for (const [key, message] of Object.entries(fields)) {
      if (values[key] === '') {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Lỗi',
          text2: message,
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 40,
          bottomOffset: 50,
        });
        return;
      }
    }

    if (password !== rePassword) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Lỗi',
        text2: 'Mật khẩu không trùng khớp',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 50,
      });
      return; 
    }

    const data = {
      email: email,
      name: name,
      password: password
    }

    const res = await authCandidate.candidatRegister(data)

    if (res && res.data.statusCode === 201) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Thành công',
        text2: 'Đăng ký tài khoản thành công',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 50,
      });
      navigation.navigate('LoginEmailAndPassword')
    }
    else {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Lỗi',
        text2: 'Đăng ký tài khoản thất bại',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 40,
        bottomOffset: 50,
      });
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
            <Fontisto name="person" size={20} color="black" />
            <TextInput
              style={styles.ml}
              placeholder='Họ và tên'
              onChangeText={(text) => {
                setName(text)
              }}
            />
          </View>
          <View style={styles.item}>
            <MaterialIcons name="email" size={20} color="black" />
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
              <Fontisto name="locked" size={20} color="black" />
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
                !isCheckShowPassword ? <FontAwesome name="eye-slash" size={20} color="black" /> : <FontAwesome name="eye" size={20} color="black" />
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
              <Fontisto name="locked" size={20} color="black" />
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
                !isCheckShowRePassword ? <FontAwesome name="eye-slash" size={20} color="black" /> : <FontAwesome name="eye" size={20} color="black" />
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
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 50
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 5,
  },
  center: {
    flex: 1,
    marginTop: 20
  },
  titleRegister: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
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