import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { categoriesApi } from '../../../../../../api/categories/categoriesApi';
import { useEffect, useState } from 'react';
import { Foundation } from '@expo/vector-icons';

export default function ListParentCategory({
  search,
  dataCategoryFilter,
  setDataCategoryFilter,
  setShowModalCategory
}) {
  const [categories, setCategories] = useState([]);

  const fetchDataCategory = async () => {
    const res = await categoriesApi.getCategories('vi', search ? search : '');

    if (res && res.data.code) {
      setCategories(res.data.data);
    }
  };

  useEffect(() => {
    fetchDataCategory();
  }, [search]);

  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.parent_category_id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (dataCategoryFilter.parent_category_id === item.parent_category_id) {
                  setDataCategoryFilter({});
                } else {
                  setDataCategoryFilter({ parent_category_id: item.parent_category_id, parent_category: item.parent_category });
                  setShowModalCategory(false);
                }
              }}
              style={styles.item}
            >
              <Text>{item.parent_category}</Text>
              {dataCategoryFilter.parent_category_id === item.parent_category_id && (
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
    borderBottomColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
