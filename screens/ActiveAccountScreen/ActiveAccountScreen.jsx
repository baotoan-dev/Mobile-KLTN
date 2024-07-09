import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { activeApi } from "../../api/active/activeApi";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export default function ActiveAccountScreen(prop) {
  const email = prop.route.params.email;
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const handleSendActiveCode = async () => {
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
    <View style={style.container}>
      <Text style={style.title}>Xác thực tài khoản</Text>
      <View style={style.messageBox}>
        <Text style={style.messageText}>
          Tài khoản của bạn chưa được kích hoạt, vui lòng nhấn xác thực tại đây
          để kích hoạt tài khoản của bạn và sử dụng dịch vụ của chúng tôi.
        </Text>
      </View>
      <View style={style.messageBox}>
        <Text style={style.messageText}>
          Lưu ý: Để đảm bảo an toàn cho tài khoản của bạn, vui lòng không chia
          sẻ mã xác thực này cho người khác. Mã xác thực của bạn sẽ được gửi đến
          email của bạn.
        </Text>
      </View>
      <TouchableOpacity onPress={handleSendActiveCode} style={style.button}>
        <Text style={style.buttonText}>Xác thực</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={{
          color: "#242670",
          textAlign: "center",
          fontSize: 13,
          fontWeight: "bold",
          textDecorationLine: "underline",
          marginTop: 10,
          marginBottom: 30,
        }}>
          Quay lại
        </Text>
      </TouchableOpacity>
      {loading && (
        <View style={style.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    backgroundColor: "white",
  },
  title: {
    color: "#242670",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 30,
  },
  messageBox: {
    backgroundColor: "#FFD4D4",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    height: 130,
    marginTop: 10,
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    padding: 10,
    textAlign: "justify",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#242670",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    width: "95%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
