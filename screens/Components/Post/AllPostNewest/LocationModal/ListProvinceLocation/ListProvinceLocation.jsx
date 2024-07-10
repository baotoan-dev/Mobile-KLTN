import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { locationApi } from "../../../../../../api/location/locationApi";
import { Foundation } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function ListProvinceLocation({
  idOfProvince,
  setIdOfProvince,
  setOpenListDictrict,
}) {
  const [provinces, setProvinces] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const fetchDataProvince = async () => {
    const res = await locationApi.getProvince(search ? search : "");

    if (res && res.data.code) {
      setProvinces(res.data.data);
    }
  };

  useEffect(() => {
    fetchDataProvince();
  }, [search]);

  return (
    <View>
      <View style={styles.header}>
        <Text
          style={{
            marginLeft: 5,
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          Chọn địa điểm
        </Text>
        <TouchableOpacity
          onPress={() => {
            setShowModalLocation(false);
          }}
        >
          <MaterialIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder="Tìm kiếm ngành nghề"
          onChangeText={(text) => setSearch(text)}
          style={{
            borderWidth: 0.5,
            borderColor: "black",
            padding: 5,
            borderRadius: 5,
          }}
        />
      </View>
      <FlatList
        data={provinces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (idOfProvince === item.id) {
                  setIdOfProvince("");
                  setOpenListDictrict(false);
                } else {
                  setIdOfProvince(item.id);
                  setOpenListDictrict(true);
                }
              }}
              style={styles.item}
            >
              <Text>{item.name}</Text>
              {idOfProvince === item.id && (
                <Foundation name="check" size={24} color="black" />
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
});
