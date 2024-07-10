import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { locationApi } from "../../../../../../api/location/locationApi";
import { useEffect } from "react";
import { Foundation } from "@expo/vector-icons";

export default function ListDictrictLocation({
  idOfProvince,
  dataLocationFilter,
  setDataLocationFilter,
  setShowModalLocation,
  setOpenListDictrict,
}) {
  const [districts, setDistricts] = React.useState([]);

  const fetchDataDistrict = async () => {
    const res = await locationApi.getAllDictrict(idOfProvince);

    if (res && res.data.code) {
      setDistricts(res.data.data);
    }
  };

  useEffect(() => {
    fetchDataDistrict();
  }, [idOfProvince]);

  return (
    <View>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setOpenListDictrict(false);
            }}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 5,
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            Chọn quận huyện
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowModalLocation(false);
          }}
        >
          <MaterialIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={districts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (dataLocationFilter.id === item.id) {
                  setDataLocationFilter({});
                } else {
                  setDataLocationFilter({ id: item.id, name: item.full_name });
                  setShowModalLocation(false);
                }
              }}
              style={styles.item}
            >
              <Text>{item.full_name}</Text>
              {dataLocationFilter.id === item.id && (
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
