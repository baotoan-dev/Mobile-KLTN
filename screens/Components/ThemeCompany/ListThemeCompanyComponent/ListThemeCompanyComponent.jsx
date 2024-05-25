import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ListThemeCompanyComponent({ data }) {
  return (
    <View>
      {
        data && data.length > 0 ?
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                  <View style={{
                    width: '80%',
                  }}>
                    <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
                  </View>
                  <View style={{
                    width: '20%',
                  }}>

                  </View>
                </View>
                <Text style={styles.des}>
                  {item.description}
                </Text>
                <TouchableOpacity>
                  <Text style={styles.btn}>
                    {item.nameButton}
                  </Text>
                </TouchableOpacity>
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.imageBanner}
                  />
                </View>
              </View>
            )}
          />
          :
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
            <Image style={styles.image} source={
              require('../../../../assets/images/no-data.png')
            } />
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#333',
            }}>
              Chưa tìm thấy dữ liệu
            </Text>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  item: {
    backgroundColor: '#EBE4D1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  des: {
    marginBottom: 10,
  },
  btn: {
    color: '#fff',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
    width: 100,
  },
  imageBanner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    objectFit: 'fill',
  }
})