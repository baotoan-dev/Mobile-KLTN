import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { communityApi } from "../../../../api/community/communityApi";
import Toast from "react-native-toast-message";
import { getAllCommunityOfProileAction } from "../../../../redux/store/CommunityProfile/GetAllCommunitOfProile/getAllCommunitOfProileSlice";
import { getAllHistoryCommunityOfProileAction } from "../../../../redux/store/CommunityProfile/GetAllHistoryCommunitOfProile/getAllHistoryCommunitOfProileSlice";

export default function ListBlogProfileComponent({ communityData, total }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const hideOrShowCommunity = async (id, status) => {
    const formData = new FormData();
    formData.append("status", status);

    const res = await communityApi.updateCommunity(formData, id);

    if (res && res.data.status) {
      dispatch(getAllCommunityOfProileAction(0, 10, "v"));
      Toast.show({
        type: "success",
        text1: "Cập nhật thành công",
        position: "top",
        visibilityTime: 2000,
        topOffset: 0,
      });
    }
  };

  const handleDeleteCommunication = async (id) => {
    try {
      const res = await communityApi.deleteCommunity(id);

      if (res && res.data && res.data.statusCode === 200) {
        ToastAndroid.show(res.data.message, ToastAndroid.SHORT);
        dispatch(getAllHistoryCommunityOfProileAction(0, 10, 'v'))
        navigation.navigate("BlogHistoryProfileScreen");
      }
    } catch (error) {
      
    }
  }
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
                {
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("CreateBog", {
                        type: "edit",
                        data: item,
                      });
                    }}
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <AntDesign name="edit" size={24} color="black" />
                  </TouchableOpacity>
                }
                 <TouchableOpacity
                    onPress={() => {
                      handleDeleteCommunication(item.id)
                    }}
                    style={{
                      marginRight: 10,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>
                {item.status === 1 ? (
                  <TouchableOpacity
                    onPress={() => {
                      hideOrShowCommunity(item.id, 0);
                    }}
                  >
                    <Entypo name="eye-with-line" size={20} color="black" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      hideOrShowCommunity(item.id, 1);
                    }}
                  >
                    <Entypo name="eye" size={20} color="black" />
                  </TouchableOpacity>
                )}
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
    width: "80%",
  },
  right: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
