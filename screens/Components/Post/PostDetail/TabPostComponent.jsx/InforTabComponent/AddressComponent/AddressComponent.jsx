import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AddressComponent({ post }) {
  const location =
    post.ward && post.district && post.province
      ? `${post.ward}, ${post.district}, ${post.province}`
      : "Không xác định";

  return (
    <View style={styles.container}>
      <FontAwesome5 name="hand-point-right" size={24} color="black" />
      <Text
        style={{
          marginLeft: 10,
        }}
      >
        {location}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
