import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import jobApi from "../../../../api/job/jobApi";
import { Ionicons } from "@expo/vector-icons";
import MoreInforComponent from "./MoreInforComponent/MoreInforComponent";
import TabPostComponent from "./TabPostComponent.jsx/TabPostComponent";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { bookmarksApi } from "../../../../api/bookmarks/bookmarksApi";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAnalyticsAction } from "../../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice";
import { getNewPostAction } from "../../../../redux/store/NewPost/newPostSlice";
import Toast from "react-native-toast-message";
import { getProfileAction } from "../../../../redux/store/Profile/profileSilce";
import { ToastAndroid } from "react-native";
import { getDetailPostAction } from "../../../../redux/store/Post/getDetailPostSlice";

export default function PostDetail(prop) {
  const id = prop.route.params.id;
  const profile = useSelector((state) => state.profile.profile);
  const postDetail = useSelector((state) => state.getPostDetail.postDetail);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [fitOfPost, setFitOfPost] = useState("");
  const [post, setPost] = useState({});
  const [scrollY, setScrollY] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getDetailPostAction(id, 'vi'));
    dispatch(getProfileAction("vi"));
  }, []);

  useEffect(() => {
    if (postDetail) {
      setPost(postDetail.data);
      setFitOfPost(postDetail.fit);
    }
  }, [postDetail]);

  const handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y > 300) {
      setScrollY(true);
    } else {
      setScrollY(true);
    }
  };

  const handleCreateBookmark = async () => {
    if (profile.isActive === 0) {
      ToastAndroid.showWithGravity(
        "Tài khoản chưa được kích hoạt",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setTimeout(() => {
        navigation.navigate("ActiveAccount", {
          email: profile.email,
        });
      }, 2000);
      return;
    }
    const res = await bookmarksApi.createBookMark(post.id);

    if (res && res.data.code === 200) {
      dispatch(getDetailPostAction(post.id, "vi"));
      dispatch(getProfileAnalyticsAction());
      dispatch(getNewPostAction(null, null, null, null, 16, null, "vi", 0));
    }
  };

  const handleDeleteBookmark = async () => {
    if (profile.isActive === 0) {
      ToastAndroid.showWithGravity(
        "Tài khoản chưa được kích hoạt",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setTimeout(() => {
        navigation.navigate("ActiveAccount", {
          email: profile.email,
        });
      }, 2000);
      return;
    }
    const res = await bookmarksApi.deleteBookMark(post.id);

    if (res && res.data.code === 200) {
      dispatch(getDetailPostAction(post.id, "vi"));
      dispatch(getProfileAnalyticsAction());
      dispatch(getNewPostAction(null, null, null, null, 16, null, "vi", 0));
    }
  };

  useEffect(() => {
    dispatch(getDetailPostAction(id, "vi"));
  }, [id]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getDetailPostAction(id, 'vi'));
    setRefreshing(false);
  };

  return post ? (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onScroll={(e) => {
          handleScroll(e);
        }}
      >
        <View
          style={{
            height: 330,
            width: "100%",
            marginBottom: 10,
            paddingTop: 10,
          }}
        >
          <ImageBackground
            style={styles.image}
            source={{
              uri: "https://quangcaonhat.com/wp-content/uploads/2020/08/Untitled-1-scaled.jpg",
            }}
          >
            <View style={styles.wrapper}>
              <View style={styles.componentLogo}>
                <Image
                  source={{ uri: post.image }}
                  style={styles.imageLogo}
                ></Image>
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{post.title}</Text>
              </View>
              <View style={styles.companyContainer}>
                <Text style={styles.companyName}>{post.company_name}</Text>
              </View>
              {post?.applied === true && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "gray",
                    }}
                  >
                    Đã ứng tuyển
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("SeenCvApplication", {
                        cv: post.cvApplication,
                      });
                    }}
                  >
                    <Text
                      style={{
                        color: "blue",
                        marginLeft: 5,
                        textDecorationLine: "underline",
                      }}
                    >
                      Xem CV
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <MoreInforComponent post={post} fitOfPost={fitOfPost} />
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                left: 10,
                top: 20,
                backgroundColor: "gray",
                borderRadius: 20,
                padding: 5,
                zIndex: 1000000,
              }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View
          style={{
            height: "85%",
            width: "100%",
          }}
        >
          <TabPostComponent post={post} />
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          height: "10%",
          width: "100%",
          backgroundColor: "white",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "15%",
            height: "70%",
            marginLeft: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (post.bookmarked) {
                handleDeleteBookmark();
              } else {
                handleCreateBookmark();
              }
            }}
            style={{
              borderWidth: 1,
              padding: 10,
              borderColor: "#242670",
              borderRadius: 10,
              width: "80%",
            }}
          >
            {post.bookmarked ? (
              <FontAwesome
                style={{
                  textAlign: "center",
                }}
                name="bookmark"
                size={24}
                color="black"
              />
            ) : (
              <Feather
                style={{
                  textAlign: "center",
                }}
                name="bookmark"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "85%",
            height: "70%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (profile.isActive === 0) {
                  ToastAndroid.showWithGravity(
                    "Tài khoản chưa được kích hoạt",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
                  setTimeout(() => {
                    navigation.navigate("ActiveAccount", {
                      email: profile.email,
                    });
                  }, 2000);
                  return;
                }
                navigation.navigate("ChatDetail", {
                  userId: post.account_id,
                  postId: post.post_id,
                  imageParent: post.image
                    ? post.image
                    : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1702047527/images/avatar/1702047524545-59c27fe7-3919-4a8d-a150-984d9428f184.jpg",
                  nameParent: post.company_name,
                });
              }}
              style={{
                width: "30%",
                borderWidth: 0.5,
                padding: 13,
                backgroundColor: "#242670",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                }}
              >
                {" "}
                Nhắn tin
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (profile.isActive === 0) {
                  ToastAndroid.showWithGravity(
                    "Tài khoản chưa được kích hoạt",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
                  setTimeout(() => {
                    navigation.navigate("ActiveAccount", {
                      email: profile.email,
                    });
                  }, 2000);
                  return;
                }
                if (post?.applied === false) {
                  navigation.navigate("Application", {
                    id: post.id,
                    title: post.title,
                    company_name: post.company_name,
                    image: post.image,
                    fit: fitOfPost,
                  });
                } else {
                  Toast.show({
                    type: "info",
                    position: "top",
                    text1: "Thông báo",
                    text2: "Bạn đã ứng tuyển rồi",
                    visibilityTime: 2000,
                  });
                }
              }}
              style={{
                width: "60%",
                borderWidth: 0.5,
                padding: 13,
                backgroundColor: "#242670",
                borderRadius: 10,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                }}
              >
                {post?.applied === true ? "Đã ứng tuyển" : "Ứng tuyển"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: "white",
  },
  image: {
    height: 200,
    position: "relative",
    zIndex: -1,
  },
  wrapper: {
    width: 300,
    alignSelf: "flex-start",
    backgroundColor: "white",
    bottom: "-30%",
    left: 50,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  componentLogo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    top: -40,
    left: 110,
    position: "absolute",
  },
  imageLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: "#242670",
    shadowColor: "#242670",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    marginTop: 50,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
  },
  companyContainer: {
    marginTop: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  companyName: {
    textAlign: "center",
    color: "gray",
  },
});
