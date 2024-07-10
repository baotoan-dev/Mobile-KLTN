import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import ListProvinceLocation from "./ListProvinceLocation/ListProvinceLocation";
import ListDictrictLocation from "./ListDictrictLocation/ListDictrictLocation";

export default function LocationModal({
  showModalLocation,
  setShowModalLocation,
  dataLocationFilter,
  setDataLocationFilter,
}) {
  const [idOfProvince, setIdOfProvince] = React.useState("");
  const [openListDictrict, setOpenListDictrict] = React.useState(false);

  return (
    <View>
      <Modal
        isVisible={showModalLocation}
        onBackdropPress={() => setShowModalLocation(false)}
        style={styles.bottomModal}
      >
        <View style={styles.container}>
          <ScrollView>
            {!openListDictrict ? (
              <ListProvinceLocation
                idOfProvince={idOfProvince}
                setIdOfProvince={setIdOfProvince}
                setOpenListDictrict={setOpenListDictrict}
              />
            ) : (
              <ListDictrictLocation
                idOfProvince={idOfProvince}
                dataLocationFilter={dataLocationFilter}
                setDataLocationFilter={setDataLocationFilter}
                setShowModalLocation={setShowModalLocation}
                setIdOfProvince={setIdOfProvince}
                setOpenListDictrict={setOpenListDictrict}
              />
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: "white",
    marginTop: 20,
    paddingHorizontal: 10,
    height: "70%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  input: {
    marginVertical: 10,
  },
});
