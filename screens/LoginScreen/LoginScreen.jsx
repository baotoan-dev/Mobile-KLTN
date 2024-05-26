import { StyleSheet, Text, View, SafeAreaView, Pressable, TouchableOpacity } from "react-native";
import React ,{useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
// import * as AppAuth from "expo-app-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../App";
import { useContext } from "react";

const LoginScreen = () => {
  const navigation = useNavigation();
  const {auth, setAuth} = useContext(AuthContext);
  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");

      if (accessToken) {
        setAuth(true);
      }

      // if(accessToken && expirationDate){
      //   const currentTime = Date.now();
      //   if(currentTime < parseInt(expirationDate)){
      //     navigation.replace("Main");
      //   } else {
      //     AsyncStorage.removeItem("token");
      //     AsyncStorage.removeItem("expirationDate");
      //   }
      // }
    }

    checkTokenValidity();
  },[])
  async function authenticate ()  {
    const config = {
      issuer:"https://accounts.spotify.com",
      clientId:"52a96a8298254165b607cce57175820b",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public" // or "playlist-modify-private"
      ],
      redirectUrl:"exp://192.168.1.8:8081/--/spotify-auth-callback"
    }
    // const result = await AppAuth.authAsync(config);
    console.log(result);
    if(result.accessToken){
      const expirationDate = new Date(result.accessTokenExpirationDate).getTime();
      AsyncStorage.setItem("token",result.accessToken);
      AsyncStorage.setItem("expirationDate",expirationDate.toString());
      navigation.navigate("Main")
    }
  }

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on spotify!
        </Text>

        <View style={{ height: 80 }} />
        <Pressable
        onPress={authenticate}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            marginVertical:10
          }}
        >
          <Text>Sign In with spotify</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with phone number</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
        <AntDesign name="google" size={24} color="red" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Continue with Google</Text>
        </Pressable>

        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"row",
            alignItems:"center",
            marginVertical:10,
            borderColor:"#C0C0C0",
            borderWidth:0.8
          }}
        >
         <Entypo name="facebook" size={24} color="blue" />
          <Text style={{fontWeight:"500",color:"white",textAlign:"center",flex:1}}>Sign In with facebook</Text>
        </Pressable>

        <TouchableOpacity
            onPress={() => navigation.navigate("LoginEmailAndPassword")}
        >
            <Text style={{ color: "white", textAlign: "center", fontSize: 12, textDecorationLine: 'underline' }}>
                Login with Email and Password
            </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});