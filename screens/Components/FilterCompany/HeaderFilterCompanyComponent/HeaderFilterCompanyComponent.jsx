import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ModalFIlterSizeComponent from '../ModalFIlterSizeComponent/ModalFIlterSizeComponent';
import LocationModal from '../../Post/AllPostNewest/LocationModal/LocationModal';
import CategoryModal from '../../Post/AllPostNewest/CategoryModal/CategoryModal';

export default function HeaderFilterCompanyComponent({
  companySize,
  setCompanySize,
  dataCategoryFilter,
  setDataCategoryFilter,
  dataLocationFilter,
  setDataLocationFilter,
  keyword,
  setKeyword
}) {
  const [showModalCompanySize, setShowModalCompanySize] = React.useState(false);
  const [showModalLocation, setShowModalLocation] = React.useState(false);
  const [showModalCategory, setShowModalCategory] = React.useState(false);

  return (
    <View>
      <View style={style.input}>
        <Feather name="search" size={24} color="black" />
        <TextInput
          onChangeText={(text) => {
            setKeyword(text);
          }}
          style={{
            marginLeft: 5,
          }}
          placeholder='Tìm kiếm công ty'
        />
      </View>
      <View>
        <View style={{
          width: '95%',
          flexDirection: 'row',
          marginHorizontal: 10,
          justifyContent: 'space-between'
        }}>
          <View style={{
            width: '48%'
          }}>
            <TouchableOpacity
              style={style.item}
              onPress={() => setShowModalCategory(true)}
            >
              <TextInput
                value={dataCategoryFilter ? dataCategoryFilter.parent_category : ''}
                editable={false}
                placeholder='Chọn ngành nghề'
              />
              <AntDesign name="caretdown" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{
            width: '48%'
          }}>
            <TouchableOpacity
              style={style.item}
              onPress={() => setShowModalLocation(true)}
            >
              <TextInput
                value={dataLocationFilter ? dataLocationFilter.name : ''}
                editable={false}
                placeholder='Chọn địa điểm'
              />
              <AntDesign name="caretdown" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={{
            width: '95%',
            justifyContent: 'center',
            marginHorizontal: 10,
          }}>
            <TouchableOpacity
              style={style.item}
              onPress={() => setShowModalCompanySize(true)}
            >
              <TextInput
                value={companySize.nameText ? companySize.nameText : ''}
                editable={false}
                placeholder='Chọn quy mô công ty'
              />
              <AntDesign name="caretdown" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {
        showModalCompanySize && (
          <ModalFIlterSizeComponent
            showModalCompanySize={showModalCompanySize}
            setShowModalCompanySize={setShowModalCompanySize}
            companySize={companySize}
            setCompanySize={setCompanySize}
          />
        )
      }
      {
        showModalLocation && (
          <LocationModal
            showModalLocation={showModalLocation}
            setShowModalLocation={setShowModalLocation}
            dataLocationFilter={dataLocationFilter}
            setDataLocationFilter={setDataLocationFilter}
          />
        )
      }
      {
        showModalCategory && (
          <CategoryModal
            showModalCategory={showModalCategory}
            setShowModalCategory={setShowModalCategory}
            dataCategoryFilter={dataCategoryFilter}
            setDataCategoryFilter={setDataCategoryFilter}
          />
        )
      }
    </View>
  )
}


const style = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    margin: 10,
    borderWidth: 0.5,
    borderColor: '#242670',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: '#242670',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})