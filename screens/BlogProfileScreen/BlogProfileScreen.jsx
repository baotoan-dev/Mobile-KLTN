import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import ListBlogProfileComponent from "../Components/Blog/ListBlogProfileComponent/ListBlogProfileComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommunityOfProileAction } from "../../redux/store/CommunityProfile/GetAllCommunitOfProile/getAllCommunitOfProileSlice";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

export default function BlogProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const allCommunityOfProfile = useSelector(
    (state) => state.allCommunityOfProfile.allCommunitOfProile
  );
  const [currentPage, setCurrentPage] = React.useState(0);
  const [communityData, setCommunityData] = React.useState([]);
  const [isOver, setIsOver] = React.useState(false);
  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    dispatch(getAllCommunityOfProileAction(currentPage, 10, "v"));
  }, []);

  useEffect(() => {
    if (allCommunityOfProfile && allCommunityOfProfile.data) {
      setCommunityData(allCommunityOfProfile.data.communications);
      setIsOver(allCommunityOfProfile.data.is_over);
      setTotal(allCommunityOfProfile.data.total);
    }
  }, [allCommunityOfProfile]);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#242670" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 17,
            marginLeft: 5,
            fontWeight: "bold",
            color: "#242670",
          }}
        >
          Blog cá nhân
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingTop: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            width: "80%",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Bài viết
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "20%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("BlogHistoryProfileScreen");
            }}
            style={{
              marginLeft: 10,
            }}
          >
            <FontAwesome name="history" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 10,
            }}
            onPress={() => {
              navigation.navigate("CreateBog", {
                type: "create",
                data: null,
              });
            }}
          >
            <Ionicons name="add-circle-sharp" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <ListBlogProfileComponent communityData={communityData} total={total} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    borderBottomColor: "gray",
  },
});
