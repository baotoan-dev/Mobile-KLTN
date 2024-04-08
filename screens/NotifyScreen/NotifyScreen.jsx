import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { notificationApi } from '../../api/notification/notificationApi'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

export default function NotifyScreen() {
  const navigation = useNavigation()
  const [dataNotify, setDataNotify] = React.useState([])
  const [isOver, setIsOver] = React.useState(false)

  const handleClickNoty = (
    postId,
    commentId,
    applicationId,
    typeText
  ) => {
    if (typeText === "recruiter") {

    }
    if (typeText === "applicator") {
      navigation.navigate('PostDetail', {
        id: postId
      })
    }
    if (typeText === "communicationComment") {
      navigation.navigate('DetailBlog', {
        id: commentId
      })
    }
  };


  const fetchData = async () => {
    const response = await notificationApi.getNotification('vi')

    if (response && response.status === 200) {
      setIsOver(response.data.data.is_over)
      setDataNotify(response.data.data.notifications)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])
  return (
    <View style={styles.container}>
      <Text style={
        styles.header
      }>
        Thông báo
      </Text>
      {
        dataNotify && dataNotify.length > 0 ? (
          <ScrollView>
            <FlatList
              data={dataNotify}
              keyExtractor={(item) => item.data.notificationId.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item}
                  onPress={() => handleClickNoty(
                    item.data.postId,
                    item.data.communicationId,
                    item.data.applicationId,
                    item.data.typeText
                  )}
                >
                  <Text style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                    {item.content.title}
                  </Text>
                  <Text>
                    {item.content.body}
                  </Text>
                  <Text style={{
                    color: 'gray',
                    fontSize: 12, 
                  }}>
                    {
                      moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')
                    }
                  </Text>
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        ) : (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}>
            <Image style={styles.image} source={
              require('../../images/no-data.png')
            } />
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#333',
            }}>
              Chưa tìm thấy thông báo
            </Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    padding: 10,
    backgroundColor: 'white',
  },
  item: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    borderRadius: 10,
    padding: 10,
    margin: 10,   
    backgroundColor: '#FEFDED',
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