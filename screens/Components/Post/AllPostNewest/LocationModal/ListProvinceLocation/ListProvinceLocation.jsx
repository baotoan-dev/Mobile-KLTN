import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { locationApi } from '../../../../../../api/location/locationApi'
import { Foundation } from '@expo/vector-icons';

export default function ListProvinceLocation({
  search,
  idOfProvince,
  setIdOfProvince
}) {
  const [provinces, setProvinces] = React.useState([])
  const fetchDataProvince = async () => {
    const res = await locationApi.getProvince(search ? search : '')

    if (res && res.data.code) {
      setProvinces(res.data.data)
    }
  }

  useEffect(() => {
    fetchDataProvince()
  }, [search])
  return (
    <View>
      <FlatList
        data={provinces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (idOfProvince.includes(item.id)) {
                  setIdOfProvince(idOfProvince.filter((id) => id !== item.id))
                }
                else {
                  setIdOfProvince([...idOfProvince, item.id])
                }
              }}
              style={styles.item}
            >
              <Text>{item.name}</Text>
              {
                idOfProvince.includes(item.id) ?
                  <Foundation name="check" size={24} color="black" />
                  :
                  null
              }
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
})