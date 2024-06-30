import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

export default function ModalVerifySuccess({
  openModalVerifySuccess,
  setOpenModalVerifySuccess,
  handleReloadProfile,
}) {
  const navigation = useNavigation();

  return (
    <Modal
      isVisible={openModalVerifySuccess}
      onBackdropPress={() => setOpenModalVerifySuccess(false)}
    >
      <View
        style={{
          backgroundColor: "white",
          padding: 22,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          borderColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Image
          source={require("../../../assets/images/tick.png")}
          style={styles.logo}
        />

        <Text style={{ fontSize: 18, marginTop: 10, textAlign: "center" }}>
          Tài khoản của bạn đã được kích hoạt thành công
        </Text>

        <TouchableOpacity
          onPress={() => {
            setOpenModalVerifySuccess(false);
            handleReloadProfile();
          }}
        >
          <Text
            style={{
              color: "#007bff",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 20,
            }}
          >
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    marginBottom: 10,
    alignSelf: "center",
    height: 100,
  },
});
