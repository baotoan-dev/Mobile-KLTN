import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { communityApi } from "../../../../api/community/communityApi";
import Toast from "react-native-toast-message";
import { getAllCommunityOfProileAction } from "../../../../redux/store/CommunityProfile/GetAllCommunitOfProile/getAllCommunitOfProileSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ListBlogHistoryProfileComponent({
  communityData,
  total,
}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleDeleteCommunication = async (id) => {
    try {
      const res = await communityApi.deleteCommunity(id);

      if (res && res.data && res.data.statusCode === 200) {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        dispatch(getAllCommunityOfProileAction(0, 10, "v"));
        navigation.navigate("BlogProfile");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: 10,
        }}
      >
        {`Tìm thấy ${total} bài viết.`}
      </Text>
      <FlatList
        data={communityData}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <View style={styles.left}>
                <Text numberOfLines={1}>{item.title}</Text>
                <Text
                  style={{
                    color: "gray",
                    fontSize: 12,
                  }}
                >
                  {item.createdAtText}
                </Text>
              </View>
              <View style={styles.right}>
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteCommunication(item.id);
                  }}
                  style={{
                    marginRight: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name="restore"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
    backgroundColor: "#D8EFD3",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    width: "90%",
  },
  right: {
    width: "10%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
