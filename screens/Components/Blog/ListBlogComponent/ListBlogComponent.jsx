import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function ListBlogComponent({ blog }) {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        data={blog}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => {
              navigation.navigate('DetailBlog', { id: item.id })
            }}>
              <View style={styles.item}>
                <Image source={{ uri: item.images[0].image }} style={styles.image} />
                <View style={styles.title}>
                  <Text
                    numberOfLines={1}
                  >{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  item: {
    width: 200,
    height: 210,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#97E7E1',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 100,
    borderRadius: 20,
    height: '70%',
    width: '90%',
    marginTop: 20,
  },
  title: {
    width: '100%',
    height: '30%',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})