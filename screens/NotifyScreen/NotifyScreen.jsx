import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllNoticationAction } from '../../redux/store/Notification/getAllNotificationSlice'
import { notificationApi } from '../../api/notification/notificationApi'

export default function NotifyScreen() {
  const navigation = useNavigation()
  const [dataNotify, setDataNotify] = React.useState([])
  const [isOver, setIsOver] = React.useState(false)
  const dispatch = useDispatch()
  const allNotification = useSelector((state) => state.allNotification.notifications)


  const fetchDataUpdate = async (notificationId) => {

    const res = await notificationApi.updateNotification(
      notificationId,
      1
    )

    if (res && res.data.code === 200) {
      dispatch(getAllNoticationAction())
    }

  }

  const handleClickNoty = (
    postId,
    commentId,
    applicationId,
    typeText,
    notificationId
  ) => {
    if (typeText === "recruiter") {

    }
    if (typeText === "applicator") {
      navigation.navigate('ManageJobApplication')
    }
    if (typeText === "communicationComment") {
      navigation.navigate('DetailBlog', {
        id: commentId
      })
    }
    if (typeText === "keyword") {
      navigation.navigate('PostDetail', {
        id: postId
      })
    }
    fetchDataUpdate(notificationId)
  };


  useEffect(() => {
    dispatch(getAllNoticationAction())
  }, [])

  useEffect(() => {
    if (allNotification) {
      setDataNotify(allNotification)
      setIsOver(allNotification.is_over)
      setDataNotify(allNotification.notifications)
    }
  }, [allNotification])

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
                <TouchableOpacity style={[styles.item, {
                  backgroundColor: item.data.isRead === false ? '#e6f7ff' : '#ffffff'
                }]}
                  onPress={() => handleClickNoty(
                    item.data.postId,
                    item.data.communicationId,
                    item.data.applicationId,
                    item.data.typeText,
                    item.data.notificationId
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
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
  },
  header: {
    fontSize: 18,
    paddingTop: 30,
    fontWeight: 'bold',
    color: '#242670',
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