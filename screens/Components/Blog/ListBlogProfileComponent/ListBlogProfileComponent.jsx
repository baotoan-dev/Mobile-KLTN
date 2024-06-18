import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ListBlogProfileComponent({
  communityData, total
}) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={{
        marginBottom: 10,
      }}>
        {
          `Tìm thấy ${total} bài viết.`
        }
      </Text>
      <FlatList
        data={communityData}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <View style={styles.left}>
                <Text
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 12,
                  }}>
                  {
                    item.createdAtText
                  }
                </Text>
              </View>
              <View style={styles.right}>
                {
                  <TouchableOpacity 
                  onPress={() => {
                    navigation.navigate('CreateBog', {
                      type: 'edit',
                      data: item
                    })
                  }}
                  style={{
                    marginRight: 10
                  }}>
                    <AntDesign name="edit" size={24} color="black" />
                  </TouchableOpacity>
                }
                {
                  item.status === 1 ? (
                    <TouchableOpacity>
                      <Entypo name="eye-with-line" size={20} color="black" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity>
                      <Entypo name="eye" size={20} color="black" />
                    </TouchableOpacity>
                  )
                }
              </View>
            </View>
          )
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
    backgroundColor: '#D8EFD3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    width: '90%',
  },
  right: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
})