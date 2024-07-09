import React, { useState, useEffect, useRef } from "react";
import { View, Text, Easing, Animated, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import { Foundation } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Color } from "./utils/Color";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import LoginScreeForEmailAndPassword from "./screens/LoginScreen/LoginScreeForEmailAndPassword";
import { AuthContext } from "./App";
import { useContext } from "react";
import CompanyDetail from "./screens/Components/Company/CompanyDetail/CompanyDetail";
import PostDetail from "./screens/Components/Post/PostDetail/PostDetail";
import Search from "./screens/Components/Search/Search";
import SearchResult from "./screens/Components/Search/SearchResult/SearchResult";
import Filter from "./screens/Components/Search/Filter/Filter";
import DetailBlog from "./screens/Components/Blog/DetailBlog/DetailBlog";
import SeeAllBlog from "./screens/Components/Blog/SeeAllBlog/SeeAllBlog";
import MoreInforOfTopCompany from "./screens/Components/Company/MoreInforOfTopCompany/MoreInforOfTopCompany";
import Application from "./screens/Components/Application/Application";
import NotifyScreen from "./screens/NotifyScreen/NotifyScreen";
import CVScreen from "./screens/CVScreen/CVScreen";
import ModifyPassword from "./screens/ProfileScreen/ContentProfile/SettingProfile/ModifyPassword/ModifyPassword";
import DisablePassAccount from "./screens/ProfileScreen/ContentProfile/SettingProfile/DisablePassAccount/DisablePassAccount";
import ManageJobApplication from "./screens/ProfileScreen/ContentProfile/ManageFindJob/ManageJobApplication/ManageJobApplication";
import AllPostNewest from "./screens/Components/Post/AllPostNewest/AllPostNewest";
import ChatScreen from "./screens/ChatScreen/ChatScreen";
import PDFScreen from "./screens/PDFScreen/PDFScreen";
import ThemeCvList from "./screens/CVScreen/ThemeCvList/ThemeCvList";
import InforContentForCV from "./screens/PDFScreen/InforContentForCV/InforContentForCV";
import PersonalInformation from "./screens/PDFScreen/InforContentForCV/PersonalInformation/PersonalInformation";
import Project from "./screens/PDFScreen/InforContentForCV/Project/Project";
import Education from "./screens/PDFScreen/InforContentForCV/Education/Education";
import AddEducation from "./screens/PDFScreen/InforContentForCV/Education/AddEducation/AddEducation";
import UpdateEducation from "./screens/PDFScreen/InforContentForCV/Education/UpdateEducation/UpdateEducation";
import Certification from "./screens/PDFScreen/InforContentForCV/Certification/Certification";
import AddCertification from "./screens/PDFScreen/InforContentForCV/Certification/AddCertification/AddCertification";
import UpdateCertification from "./screens/PDFScreen/InforContentForCV/Certification/UpdateCertification/UpdateCertification";
import UpdateProject from "./screens/PDFScreen/InforContentForCV/Project/UpdateProject/UpdateProject";
import AddProject from "./screens/PDFScreen/InforContentForCV/Project/AddProject/AddProject";
import ChatDetail from "./screens/ChatScreen/ChatDetail/ChatDetail";
import ViewProfile from "./screens/ViewProfile/ViewProfile";
import CompanyFollowingScreen from "./screens/CompanyFollowingScreen/CompanyFollowingScreen";
import CreateNotificationScreen from "./screens/CreateNotificationScreen/CreateNotificationScreen";
import BookmarkScreen from "./screens/BookmarkScreen/BookmarkScreen";
import NotifyJobProfileScreen from "./screens/NotifyJobProfileScreen/NotifyJobProfileScreen";
import JobFitScreen from "./screens/JobFitScreen/JobFitScreen";
import SeenPDFScreen from "./screens/SeenPDFScreen/SeenPDFScreen";
import Skill from "./screens/PDFScreen/InforContentForCV/Skill/Skill";
import Award from "./screens/PDFScreen/InforContentForCV/Award/Award";
import AddSkill from "./screens/PDFScreen/InforContentForCV/Skill/AddSkill/AddSkill";
import UpdateSkill from "./screens/PDFScreen/InforContentForCV/Skill/UpdateSkill/UpdateSkill";
import AddAward from "./screens/PDFScreen/InforContentForCV/Award/AddAward/AddAward";
import UpdateAward from "./screens/PDFScreen/InforContentForCV/Award/UpdateAward/UpdateAward";
import CreateBlogComponent from "./screens/Components/Blog/CreateBlogComponent/CreateBlogComponent";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen/ForgotPasswordScreen";
import HotCompanyScreen from "./screens/HotCompanyScreen/HotCompanyScreen";
import { useDispatch, useSelector } from "react-redux";
import { getAllNoticationAction } from "./redux/store/Notification/getAllNotificationSlice";
import VerifyOTPScreen from "./screens/VerifyOTPScreen/VerifyOTPScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen/ResetPasswordScreen";
import BlogProfileScreen from "./screens/BlogProfileScreen/BlogProfileScreen";
import SeenCVApplied from "./screens/Components/Post/PostDetail/SeenCVApplied/SeenCVApplied";
import ActiveAccountScreen from "./screens/ActiveAccountScreen/ActiveAccountScreen";
import VerifyOTPActiveScreen from "./screens/VerifyOTPActiveScreen/VerifyOTPActiveScreen";
import AISeenJobForCVScreen from "./screens/AISeenJobForCVScreen/AISeenJobForCVScreen";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  const dispatch = useDispatch();
  const allNotification = useSelector(
    (state) => state.allNotification.notifications
  );
  const [totalNotSeen, setTotalNotSeen] = useState(0);

  useEffect(() => {
    dispatch(getAllNoticationAction());
  }, []);

  useEffect(() => {
    if (allNotification) {
      setTotalNotSeen(allNotification.total_is_not_read);
    }
  }, [allNotification]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#e91e63",
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Color.white,
          shadowColor: Color.black,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Foundation name="home" size={24} color={Color.primary} />
            ) : (
              <Foundation name="home" size={24} color={Color.secondary} />
            ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
      <Tab.Screen
        name="CV"
        component={CVScreen}
        options={{
          tabBarLabel: "CV",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="file-document"
                size={24}
                color={Color.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="file-document"
                size={24}
                color={Color.secondary}
              />
            ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="chat"
                size={24}
                color={Color.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="chat"
                size={24}
                color={Color.secondary}
              />
            ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotifyScreen}
        options={{
          tabBarLabel: "Notification",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <View>
                <MaterialCommunityIcons
                  name="bell"
                  size={24}
                  color={Color.primary}
                />
                {totalNotSeen > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalNotSeen}</Text>
                  </View>
                )}
              </View>
            ) : (
              <View>
                <MaterialCommunityIcons
                  name="bell"
                  size={24}
                  color={Color.secondary}
                />
                {totalNotSeen > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalNotSeen}</Text>
                  </View>
                )}
              </View>
            ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={Color.primary}
              />
            ) : (
              <MaterialCommunityIcons
                name="account"
                size={24}
                color={Color.secondary}
              />
            ),
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13,
          },
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function Navigation() {
  const { auth } = useContext(AuthContext);
  const [isWaiting, setIsWaiting] = useState(true);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!auth) {
      const timer = setTimeout(() => {
        setIsWaiting(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [auth]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!auth && isWaiting) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.Image
          source={require("./assets/images/loading.png")}
          style={{
            width: 60,
            height: 60,
            transform: [{ rotate }],
          }}
        />
        <Text
          style={{
            color: "#000",
            fontSize: 16,
            marginTop: 10,
            fontWeight: "bold",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!auth ? (
          <>
            <Stack.Screen
              name="LoginEmailAndPassword"
              component={LoginScreeForEmailAndPassword}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{
              headerShown: false,
            }}
          />
        )}
        {/* company */}
        <Stack.Screen
          name="CompanyDetail"
          component={CompanyDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MoreInforOfTopCompany"
          component={MoreInforOfTopCompany}
          options={{
            headerShown: false,
          }}
        />

        {/* post */}
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AllPostNewest"
          component={AllPostNewest}
          options={{
            headerShown: false,
          }}
        />

        {/* search */}
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{
            headerShown: false,
          }}
        />

        {/* filter */}
        <Stack.Screen
          name="Filter"
          component={Filter}
          options={{
            headerShown: false,
          }}
        />

        {/* blog */}
        <Stack.Screen
          name="DetailBlog"
          component={DetailBlog}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SeeAllBlog"
          component={SeeAllBlog}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateBog"
          component={CreateBlogComponent}
          options={{
            headerShown: false,
          }}
        />

        {/* applicaton */}
        <Stack.Screen
          name="Application"
          component={Application}
          options={{
            headerShown: false,
          }}
        />

        {/* Setting profile */}
        <Stack.Screen
          name="ModifyPassword"
          component={ModifyPassword}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="DisablePassAccount"
          component={DisablePassAccount}
          options={{
            headerShown: false,
          }}
        />

        {/* Manage Find Job */}
        <Stack.Screen
          name="ManageJobApplication"
          component={ManageJobApplication}
          options={{
            headerShown: false,
          }}
        />

        {/* Create PDF */}
        <Stack.Screen
          name="PDFScreen"
          component={PDFScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ThemeCvList"
          component={ThemeCvList}
          options={{
            headerShown: false,
          }}
        />

        {/* Bottom of CV */}

        <Stack.Screen
          name="InforContentForCV"
          component={InforContentForCV}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformation}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Project"
          component={Project}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Education"
          component={Education}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Certification"
          component={Certification}
          options={{
            headerShown: false,
          }}
        />

        {/* Education */}

        <Stack.Screen
          name="AddEducation"
          component={AddEducation}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UpdateEducation"
          component={UpdateEducation}
          options={{
            headerShown: false,
          }}
        />

        {/* Cetification */}

        <Stack.Screen
          name="AddCertification"
          component={AddCertification}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UpdateCertification"
          component={UpdateCertification}
          options={{
            headerShown: false,
          }}
        />

        {/* Project */}

        <Stack.Screen
          name="UpdateProject"
          component={UpdateProject}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AddProject"
          component={AddProject}
          options={{
            headerShown: false,
          }}
        />

        {/* Chat */}

        <Stack.Screen
          name="ChatDetail"
          component={ChatDetail}
          options={{
            headerShown: false,
          }}
        />

        {/* View profile */}

        <Stack.Screen
          name="ViewProfile"
          component={ViewProfile}
          options={{
            headerShown: false,
          }}
        />

        {/* Company is following */}

        <Stack.Screen
          name="CompanyFollowing"
          component={CompanyFollowingScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* CreateNotificationScreen */}

        <Stack.Screen
          name="CreateNotification"
          component={CreateNotificationScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Bookmark Screen */}

        <Stack.Screen
          name="Bookmark"
          component={BookmarkScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* NotifyJobProfileScreen */}

        <Stack.Screen
          name="NotifyJobProfile"
          component={NotifyJobProfileScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* JobFitScreen */}

        <Stack.Screen
          name="JobFit"
          component={JobFitScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* MoreInforOfTopCompanyScreen */}

        <Stack.Screen
          name="MoreInforOfTopCompanyScreen"
          component={MoreInforOfTopCompany}
          options={{
            headerShown: false,
          }}
        />

        {/* See pdf link */}

        <Stack.Screen
          name="SeenPDF"
          component={SeenPDFScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Skill */}

        <Stack.Screen
          name="Skill"
          component={Skill}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AddSkill"
          component={AddSkill}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UpdateSkill"
          component={UpdateSkill}
          options={{
            headerShown: false,
          }}
        />

        {/* Award */}

        <Stack.Screen
          name="Award"
          component={Award}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="AddAward"
          component={AddAward}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UpdateAward"
          component={UpdateAward}
          options={{
            headerShown: false,
          }}
        />

        {/* Register */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Forgot password */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTPScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Hot company */}

        <Stack.Screen
          name="HotCompany"
          component={HotCompanyScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Reset password */}
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Blog profile */}
        <Stack.Screen
          name="BlogProfile"
          component={BlogProfileScreen}
          options={{
            headerShown: false,
          }}
        />

        {/* Seen CV */}
        <Stack.Screen
          name="SeenCvApplication"
          component={SeenCVApplied}
          options={{
            headerShown: false,
          }}
        />

        {/* Active account */}

        <Stack.Screen
          name="ActiveAccount"
          component={ActiveAccountScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VerifyOTPActive"
          component={VerifyOTPActiveScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
         name="AIJobForCvScreen"
         component={AISeenJobForCVScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "red",
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default Navigation;
