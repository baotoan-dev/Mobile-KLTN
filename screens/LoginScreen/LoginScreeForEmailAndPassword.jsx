import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
  } from "react-native";
  import React, { useState } from "react";
  import { StyleSheet } from "react-native";
  import { Entypo } from "@expo/vector-icons";
  import { authCandidate } from "../../api/candidate/auth";
  import { AuthContext } from "../../App";
  import { useContext } from "react";
  import * as SecureStore from "expo-secure-store";
  import { useNavigation } from "@react-navigation/native";
  import Toast from "react-native-toast-message";
  import * as Google from "expo-auth-session/providers/google";
  import * as WebBrowser from "expo-web-browser";
  import { makeRedirectUri } from "expo-auth-session";
  
  WebBrowser.maybeCompleteAuthSession();
  
  export default function LoginScreeForEmailAndPassword() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { auth, setAuth } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
  
    const discovery = {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      revocationEndpoint: 'https://oauth2.googleapis.com/revoke'
    };
    
    
    const redirectUri = makeRedirectUri({
        useProxy: true,
      });
    
    console.log("Redirect URI: ", redirectUri);
    
    const [request, response, promptAsync] = Google.useAuthRequest({
      clientId: "157728721726-oenicisps96tt1jhq4hmej0j1k66qeea.apps.googleusercontent.com",
      expoClientId: "157728721726-oenicisps96tt1jhq4hmej0j1k66qeea.apps.googleusercontent.com",
      androidClientId: "157728721726-41nkgblnad3c3u2eqv5eugbraj79qovd.apps.googleusercontent.com",
      scopes: ["email", "profile"],
      redirectUri,
      responseType: "token",
    }, discovery);
    
  
    React.useEffect(() => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        console.log(id_token);
      }
    }, [response]);
  
    const handleLogin = async () => {
      try {
        if (email === "" || password === "") {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Lỗi",
            text2: "Vui lòng nhập đầy đủ thông tin",
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 100,
          });
          return;
        }
        // check regex email
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
          Toast.show({
            type: "error",
            position: "top",
            text1: "Lỗi",
            text2: "Email không hợp lệ",
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 40,
            bottomOffset: 100,
          });
          return;
        }
  
        const response = await authCandidate.signInCandidate(email, password);
  
        if (response.code === 200) {
          SecureStore.setItemAsync("accountId", response.data.accountId);
          SecureStore.setItemAsync("token", response.data.accessToken);
          SecureStore.setItemAsync("refreshToken", response.data.refreshToken);
          console.log("Login success");
          setAuth(true);
        } else {
          console.log("Login failed");
        }
      } catch (error) {
        throw error;
      }
    };
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: windowHeight > 890 ? "45%" : "40%",
          }}
        >
          <Image
            source={require("../../images/login.jpg")}
            style={{
              textAlign: "center",
              width: "100%",
              height: "90%",
              marginTop: 20,
              borderRadius: 20,
              objectFit: "contain",
            }}
          ></Image>
        </View>
        <Text style={styles.title}>Login</Text>
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <View style={styles.item}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo
                name="email"
                size={20}
                color="black"
                style={{
                  marginRight: 10,
                }}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                style={styles.input}
                onChangeText={(text) => {
                  setEmail(text);
                }}
              />
            </View>
          </View>
  
          <View style={styles.item}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "90%",
              }}
            >
              <Entypo
                name="lock"
                size={20}
                color="black"
                style={{
                  marginRight: 10,
                }}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="black"
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={showPassword ? false : true}
              />
            </View>
            <View
              style={{
                width: "10%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <Entypo name="eye" size={20} color="black" />
                ) : (
                  <Entypo name="eye-with-line" size={20} color="black" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
  
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
          style={{ marginTop: 10, paddingHorizontal: 20 }}
        >
          <Text
            style={{
              textAlign: "right",
              color: "rgba(52, 14, 231, 0.56)",
              fontWeight: "bold",
            }}
          >
            Quên mật khẩu ?
          </Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={{
            width: "100%",
            padding: 20,
          }}
          onPress={handleLogin}
        >
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
  
        <Text
          style={{
            color: "black",
            textAlign: "center",
          }}
        >
          OR
        </Text>
  
        <TouchableOpacity
          onPress={() => {
            promptAsync();
          }}
          style={{
            width: "100%",
            padding: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(213, 213, 214, 0.56)",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View>
              <Image
                source={require("../../images/google.png")}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 10,
                }}
              ></Image>
            </View>
            <Text
              style={{
                color: "black",
              }}
            >
              Đăng nhập bằng google
            </Text>
          </View>
        </TouchableOpacity>
  
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "black",
            }}
          >
            Bạn chưa có tài khoản ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text
              style={{
                color: "rgba(52, 14, 231, 0.56)",
                marginLeft: 5,
                fontWeight: "bold",
              }}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    title: {
      color: "black",
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 10,
      paddingHorizontal: 20,
      fontStyle: "italic",
    },
    input: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "90%",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
      color: "black",
      borderColor: "#242670",
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
      width: "100%",
      color: "white",
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
      marginTop: 20,
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 10,
      shadowColor: "blue",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
  