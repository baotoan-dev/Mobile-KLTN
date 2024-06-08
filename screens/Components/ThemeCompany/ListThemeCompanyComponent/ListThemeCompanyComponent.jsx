import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native'
import React from 'react'

export default function ListThemeCompanyComponent({ data }) {
  return (
    <ScrollView>
      {
        data && data.length > 0 ?
          <View>
            {
              data.length > 0 && (<View>
                <Text style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                  {
                    `Các chủ đề công ty (${data.length})`
                  }
                </Text>
              </View>)
            }
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{
                marginBottom: 10,
                height: '90%',
              }}
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
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(item.link)
                    }}
                  >
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
          </View>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
  },
  item: {
    backgroundColor: '#CAE6B2',
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
    textAlign: 'justify',
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