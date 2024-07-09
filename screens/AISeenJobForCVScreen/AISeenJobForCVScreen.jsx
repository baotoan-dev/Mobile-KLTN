import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderOfScreen from "../Components/HeaderOfScreen/HeaderOfScreen";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobForCVSliceAction } from "../../redux/store/AISeenForCV/getAllJobForCVSlice";
import { useNavigation } from "@react-navigation/native";

export default function AISeenJobForCVScreen() {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const aiGetAllJob = useSelector((state) => state.aiGetAllJob.allJobForCV);
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllJobForCVSliceAction(1, 1, limit));
  }, []);

  useEffect(() => {
    dispatch(getAllJobForCVSliceAction(1, page, limit));
  }, [page]);

  useEffect(() => {
    if (page > 1) {
      setData((prevData) => [...prevData, ...aiGetAllJob]);
    } else {
      setData(aiGetAllJob);
    }
  }, [aiGetAllJob]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PostDetail", {
          id: item.id,
        });
      }}
      key={item.id}
      style={styles.item}
    >
      <View style={{ width: "20%" }}>
        <Image
          source={{
            uri: item.logoPath
              ? item.logoPath
              : "https://res.cloudinary.com/ddwjnjssj/image/upload/v1713367062/images/avatar/1713367060658-ea9de9cd-0772-4cdf-a9c8-ac38503405ad.png",
          }}
          style={{ width: 50, height: 50 }}
        />
      </View>
      <View style={{ width: "80%" }}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <Text>{item.companyName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <HeaderOfScreen title="Công việc theo CV" />
      <View style={styles.container}>
        <Text>Tìm thấy {aiGetAllJob.length} công việc</Text>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    width: "100%",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#F7E7DC",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
