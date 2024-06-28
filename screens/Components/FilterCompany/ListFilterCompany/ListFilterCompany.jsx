import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function ListFilterCompany({
  dataAllCompanyFilter,
  handleLoadMore,
  isOver
}) {
  const navigation = useNavigation();
  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent) && !isOver) {
          handleLoadMore();
        }
      }}
      scrollEventThrottle={400}
      showsVerticalScrollIndicator={false} style={styles.container}>
      {
        dataAllCompanyFilter.length === 0 ? (
          <View style={{
            marginTop: 100
          }}>
            <Image
              source={require('../../../../images/no-data.png')}
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center'
              }}
            />
            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18
            }}>
              Không có dữ liệu
            </Text>
          </View>
        ) : (
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 100
          }}>
            {
              dataAllCompanyFilter.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.item}
                  onPress={() => {
                    navigation.navigate('CompanyDetail', { id: item.id })
                  }}
                >
                  <View style={{
                    width: '100%',
                  }}>
                    <View style={{
                      height: '75%'
                    }}>
                      <Image
                        source={{ uri: item.logoPath ? item.logoPath : 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' }}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </View>

                  </View>
                  <View style={{
                    height: '20%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <Text numberOfLines={1} style={styles.nameCompany}>
                      {item.name}
                    </Text>
                    <Text style={styles.sizeCompany}>
                      {item.companySize ? item.companySize.name : 'Chưa cập nhật'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        )
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  item: {
    borderColor: '#242670',
    width: '45%',
    margin: 5,
    alignItems: 'center',
    borderRadius: 5,
    height: 200,
    backgroundColor: '#EEF7FF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  nameCompany: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  sizeCompany: {
    fontSize: 11,
    color: 'gray'
  }
})