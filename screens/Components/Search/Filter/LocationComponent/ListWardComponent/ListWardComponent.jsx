import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ListWardComponent({ idProvince, setIsCheckClickProvince }) {
  const location = useSelector((state) => state.location.location)
  const [filteredDistricts, setFilteredDistricts] = React.useState([]);
  const [filteredName, setFilteredName] = React.useState([]);
  const [search, setSearch] = React.useState(null)

  useEffect(() => {
    if (!location) return;
    location.forEach((province) => {
      if (province.province_id === idProvince) {
        setFilteredDistricts(province.districts);
      }
    });
  }, [idProvince]);

  useEffect(() => {
    if (!filteredDistricts) return;
    const filtered = filteredDistricts.filter((district) => {
      return district.district.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredName(filtered);
  }, [search]);

  return (
    <View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <TouchableOpacity onPress={() => {
            setIsCheckClickProvince(false)
          }}>
            <Ionicons name="arrow-back-outline" size={24} color="black" style={{
              marginRight: 5,
            }} />
          </TouchableOpacity>
          <Text style={{
            fontSize: 17,
            fontWeight: 'bold',
          }}>Chọn tỉnh thành</Text>
        </View>
        <TouchableOpacity onPress={() => {
          setShowModalLocation(false)
        }}>
          <MaterialIcons name="cancel" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput
          onChangeText={(text) => {
            setSearch(text)
          }}
          placeholder="Tìm kiếm tỉnh thành"
        >
        </TextInput>
      </View>
      <SafeAreaView>
        <ScrollView>
          <FlatList
            style={{
              marginTop: 10,
            }}
            data={search ? filteredName : filteredDistricts}
            keyExtractor={(item) => item.district_id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    height: 50,
                    justifyContent: 'center',
                    borderBottomWidth: 0.5,
                    borderBottomColor: 'gray',
                    paddingLeft: 10,
                  }}
                  onPress={() => {
                    setShowModalLocation(false)
                  }}
                >
                  <Text>{item.district}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}