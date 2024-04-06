import { View, Text, StyleSheet, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { notificationApi } from '../../api/notification/notificationApi'

export default function NotifyScreen() {
  const [dataNotify, setDataNotify] = React.useState([])
  const [isOver, setIsOver] = React.useState(false)
  const fetchData = async () => {
    const response = await notificationApi.getNotification('vi')

    if (response && response.status === 200) {
      setIsOver(response.data.data.is_over)
      setDataNotify(response.data.data.notifications)
    }
  }

  console.log(dataNotify);

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
                <View style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                }}>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#333',
                  }}>
                    {item.content.body}
                  </Text>
                </View>
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
  }
})