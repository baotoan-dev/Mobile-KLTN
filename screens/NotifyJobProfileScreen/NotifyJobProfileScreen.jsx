import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React from "react";
import HeaderOfScreen from "../Components/HeaderOfScreen/HeaderOfScreen";
import { FAB } from "react-native-elements";
import ModalAllNotificationProfile from "../Components/NotificationProfileComponent/ModalAllNotificationProfile/ModalAllNotificationProfile";
import ListKeywordNotificationComponent from "../Components/NotificationProfileComponent/ListKeywordNotificationComponent/ListKeywordNotificationComponent";
import { getAllKeywordNotificationAction } from "../../redux/store/KeywordNotificaiton/getAllKeywordNotification/getAllKeywordNotificationSlice";
import { useDispatch } from "react-redux";

export default function NotifyJobProfileScreen() {
  const dispatch = useDispatch();
  const [showModalAddKeyWordNotify, setShowModalAddKeyWordNotify] =
    React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getAllKeywordNotificationAction());
    setRefreshing(false);
  };

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <HeaderOfScreen title="Thông báo việc làm" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={{
          backgroundColor: "white",
          height: "100%",
        }}
      >
        <ListKeywordNotificationComponent />
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 60,
          right: 0,
        }}
      >
        <FAB
          onPress={() => {
            setShowModalAddKeyWordNotify(!showModalAddKeyWordNotify);
          }}
          placement="right"
          buttonStyle={{
            backgroundColor: "#FF6347",
          }}
          icon={{
            type: "font-awesome",
            name: "plus",
            color: "white",
          }}
        />
      </View>
      {showModalAddKeyWordNotify && (
        <ModalAllNotificationProfile
          showModalAddKeyWordNotify={showModalAddKeyWordNotify}
          setShowModalAddKeyWordNotify={setShowModalAddKeyWordNotify}
        />
      )}
    </View>
  );
}
