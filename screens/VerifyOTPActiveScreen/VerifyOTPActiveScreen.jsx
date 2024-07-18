import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import ModalVerifySuccess from "./ModalVerifySuccess/ModalVerifySuccess";
import { activeApi } from "../../api/active/activeApi";
import { useDispatch } from "react-redux";
import { getProfileAction } from "../../redux/store/Profile/profileSilce";

export default function VerifyOTPActiveScreen(prop) {
  const email = prop.route.params.email;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const inputEmailRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [codeOfInput1, setCodeOfInput1] = React.useState("");
  const [codeOfInput2, setCodeOfInput2] = React.useState("");
  const [codeOfInput3, setCodeOfInput3] = React.useState("");
  const [codeOfInput4, setCodeOfInput4] = React.useState("");
  const [openModalVerifySuccess, setOpenModalVerifySuccess] =
    React.useState(false);

  const focusNextInput = (nextInputRef) => {
    nextInputRef.current && nextInputRef.current.focus();
  };

  const handleReloadProfile = () => {
    dispatch(getProfileAction("vi"));
    navigation.navigate("Main");
  };

  const handleSubmitOtp = async () => {
    // setOpenModalVerifySuccess(true);
    const otp = codeOfInput1 + codeOfInput2 + codeOfInput3 + codeOfInput4;

    if (otp.length < 4) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Mã xác nhận không hợp lệ",
      });
      return;
    }

    try {
      const res = await activeApi.verifyOTPActive(email, otp, "vi");

      if (res.data.statusCode === 200) {
        setOpenModalVerifySuccess(true);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Mã xác nhận không hợp lệ",
      });
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    const res = await activeApi.sendRequestActive(email, "vi");

    if (res.data.statusCode === 200) {
      Toast.show({
        type: "success",
        position: "top",
        text1: "Thành công",
        text2: "Mã xác thực đã được gửi đến email của bạn",
        visibilityTime: 2000,
      });
      navigation.navigate("VerifyOTPActive", {
        email: email,
      });
    } else {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Thất bại",
        text2: "Đã có lỗi xảy ra",
        visibilityTime: 2000,
      });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="chevron-back-circle" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/images/account.png")}
          style={styles.logo}
        />
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 27,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Mã xác nhận
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "bold",
            color: "gray",
            textAlign: "center",
            lineHeight: 20,
          }}
        >
          Lưu ý: Vui lòng nhập mã xác nhận đã được gửi đến email của bạn để kích
          hoạt tài khoản
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          ref={inputEmailRef}
          editable={false}
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "gray",
          }}
        >
          {email}
        </TextInput>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <TextInput
            ref={input1Ref}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => {
              setCodeOfInput1(text);
              if (text !== "") {
                focusNextInput(input2Ref);
              }
            }}
          />
          <TextInput
            ref={input2Ref}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => {
              setCodeOfInput2(text);
              if (text === "") {
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
            keyboardType="numeric"
            onChangeText={(text) => {
              setCodeOfInput3(text);
              if (text === "") {
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
            keyboardType="numeric"
            onChangeText={(text) => {
              setCodeOfInput4(text);
              if (text === "") {
                focusNextInput(input3Ref);
              }
            }}
          />
        </View>
      </View>
      <View style={{ width: "100%", marginTop: 30 }}>
        <TouchableOpacity
          onPress={() => {
            handleSubmitOtp();
          }}
          style={{
            marginTop: 20,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.btnSubmit}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleResendOtp();
        }}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "gray",
            fontWeight: "bold",
          }}
        >
          Gửi lại mã xác nhận
        </Text>
      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      {
        <ModalVerifySuccess
          openModalVerifySuccess={openModalVerifySuccess}
          setOpenModalVerifySuccess={setOpenModalVerifySuccess}
          handleReloadProfile={handleReloadProfile}
        />
      }
      {loading && (
        <View style={style.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  logo: {
    width: 100,
    marginBottom: 50,
    alignSelf: "center",
    height: 100,
  },
  input: {
    width: "20%",
    height: 65,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: "#DDDDDD",
    textAlign: "center",
    shadowColor: "#000",
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
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#789292",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
    textAlign: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
