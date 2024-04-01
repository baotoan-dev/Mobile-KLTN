import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { LENGTH_LOCATION } from '../../../../../../utils/LengthLocationAndCategory';

export default function ListWardComponent({
  idProvince,
  setIsCheckClickProvince,
  setShowModalLocation,
  setDataLocationFilter,
  dataLocationFilter
}) {
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

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Bạn đã chọn quá số lượng cho phép',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

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
                    if (dataLocationFilter && dataLocationFilter.length > 0 && dataLocationFilter.find((ward) => +ward.id === +item.district_id)) {
                      setDataLocationFilter(
                        dataLocationFilter.filter((ward) => ward.id !== item.district_id)
                      );
                      return;
                    }
                    if (dataLocationFilter && dataLocationFilter.length === LENGTH_LOCATION) {
                      showToastWithGravity();
                      return;
                    }

                    setDataLocationFilter([
                      ...dataLocationFilter,
                      {
                        id: item.district_id,
                        name: item.district,
                      }]
                    );
                    setShowModalLocation(false);
                  }}

                >
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Text>{item.district}</Text>
                    {
                      dataLocationFilter && dataLocationFilter.length > 0 && dataLocationFilter.find((ward) => ward.id === item.district_id)
                      &&
                      (
                        <View>
                          <Ionicons name="checkmark" size={24} color="blue" />
                        </View>
                      )
                    }
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}