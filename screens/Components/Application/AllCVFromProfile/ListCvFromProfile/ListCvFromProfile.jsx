import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import moment from "moment";
import { RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
export default function ListCvFromProfile({
  profile,
  idSelected,
  setIdSelected,
}) {
  const navigation = useNavigation();
  const [listCv, setListCv] = React.useState({});

  useEffect(() => {
    if (profile && profile.profilesCvs && profile.profilesCvs.length > 0) {
      // const filterCv = profile.profilesCvs.filter(cv => cv.status === 1)
      setListCv(profile.profilesCvs);
    }
  }, [profile]);
  return (
    <ScrollView>
      {listCv.length === 0 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Chưa có CV nào
          </Text>
        </View>
      )}
      {listCv.length > 0 && (
        <FlatList
          data={listCv}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View
                style={{
                  width: "10%",
                }}
              >
                <RadioButton
                  onPress={() => {
                    // if contain then remove
                    if (idSelected === item.id) {
                      setIdSelected("");
                    } else {
                      setIdSelected(item.id);
                    }
                  }}
                  value="first"
                  status={idSelected === item.id ? "checked" : "unchecked"}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  width: "70%",
                  marginLeft: 10,
                }}
              >
                <View>
                  <Text
                    numberOfLines={1}
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 5,
                      color: "gray",
                    }}
                  >
                    {`Cập nhật lần cuối: ${moment(item.updatedAt).format(
                      "DD/MM/YYYY"
                    )}`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SeenCvApplication', {
                    cv: item.pdfURL
                  })
                }}
                style={{
                  width: "20%",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#5755FE",
                    fontWeight: "bold",
                  }}
                >
                  Xem CV
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
});
