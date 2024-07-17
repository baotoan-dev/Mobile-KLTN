import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Company from "../Components/Company/Company";
import NewJob from "../Components/NewJob/NewJob";
import Blog from "../Components/Blog/Blog";
import { useNavigation } from "@react-navigation/native";
import BannerComponent from "../Components/BannerComponent/BannerComponent";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/store/Profile/profileSilce";
import { getNewPostAction } from "../../redux/store/NewPost/newPostSlice";

const data = [
  {
    id: "1",
    source: require("../../assets/images/blog.png"),
    navigateTo: "SeeAllBlog",
  },
  {
    id: "2",
    source: require("../../assets/images/company.png"),
    navigateTo: "MoreInforOfTopCompany",
  },
  {
    id: "3",
    source: require("../../assets/images/job.png"),
    navigateTo: "AllPostNewest",
  },
  {
    id: "4",
    source: require("../../assets/images/notify.png"),
    navigateTo: "Notification",
  },
  { id: "5", source: require("../../assets/images/cv.png"), navigateTo: "CV" },
  {
    id: "6",
    source: require("../../assets/images/apply.png"),
    navigateTo: "ManageJobApplication",
  },
  {
    id: "7",
    source: require("../../assets/images/same.png"),
    navigateTo: "JobFit",
  },
  {
    id: "8",
    source: require("../../assets/images/view.png"),
    navigateTo: "Bookmark",
  },
];

export default function HomeScreen() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  // modify color status
  StatusBar.setBackgroundColor("#fff");

  useEffect(() => {
    dispatch(getProfileAction("vi"));
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.navigateTo)}
      style={styles.wrapper}
    >
      <Image source={item.source} style={styles.image} />
    </TouchableOpacity>
  );

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getProfileAction("vi"));
    dispatch(getNewPostAction(null, null, null, null, 16, null, "vi", 0));
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {profile.isActive === 0 && (
          <View
            style={{
              backgroundColor: "#FFD4D4",
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "red",
                  textAlign: "center",
                }}
              >
                Tài khoản của bạn chưa được kích hoạt, vui lòng nhấn
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ActiveAccount", {
                      email: profile.email,
                    });
                  }}
                >
                  <Text
                    style={{
                      // underline
                      textDecorationLine: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    xác thực{" "}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    color: "red",
                  }}
                >
                  tại đây
                </Text>
              </View>
            </View>
          </View>
        )}
        <View>
          <View
            style={{
              height: 200,
            }}
          >
            <BannerComponent />
          </View>
          <View
            style={{
              backgroundColor: "#FDF5F4",
              position: "relative",
              paddingBottom: 10,
            }}
          >
            <View style={styles.input}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <AntDesign name="search1" size={24} color="black" />
                <TextInput
                  onTouchStart={() => {
                    navigation.navigate("Search");
                  }}
                  placeholder="Tìm kiếm"
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 30,
                paddingBottom: 10,
                marginTop: 20,
              }}
            >
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={4}
                columnWrapperStyle={styles.flexItem}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        <NewJob />
        <Company />
        <Blog />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#white",
    paddingTop: 30,
  },
  header: {
    height: 100,
    backgroundColor: "gray",
    position: "fixed",
  },
  input: {
    marginTop: 10,
    borderRadius: 10,
    borderColor: "gray",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginHorizontal: 10,
    position: "absolute",
    top: -30,
    width: "95%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 35,
    height: 35,
    objectFit: "fill",
  },
  wrapper: {
    width: 55,
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE4CF",
    shadowColor: "red",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    elevation: 1,
  },
  flexItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
});
