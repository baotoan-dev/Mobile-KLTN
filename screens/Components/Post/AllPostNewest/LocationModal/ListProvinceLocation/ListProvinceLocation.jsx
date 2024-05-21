import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { locationApi } from '../../../../../../api/location/locationApi';
import { Foundation } from '@expo/vector-icons';

export default function ListProvinceLocation({
  search,
  dataLocationFilter,
  setDataLocationFilter,
  setShowModalLocation,
}) {
  const [provinces, setProvinces] = React.useState([]);
  
  const fetchDataProvince = async () => {
    const res = await locationApi.getProvince(search ? search : '');

    if (res && res.data.code) {
      setProvinces(res.data.data);
    }
  };

  useEffect(() => {
    fetchDataProvince();
  }, [search]);

  return (
    <View>
      <FlatList
        data={provinces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (dataLocationFilter.id === item.id) {
                  setDataLocationFilter({});
                } else {
                  setDataLocationFilter({ id: item.id, name: item.name });
                  setShowModalLocation(false);
                }
              }}
              style={styles.item}
            >
              <Text>{item.name}</Text>
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
  item: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
