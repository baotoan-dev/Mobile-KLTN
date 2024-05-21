import { View, ScrollView, Image, Text, TextInput, TouchableOpacity, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Company from '../Components/Company/Company';
import NewJob from '../Components/NewJob/NewJob';
import Blog from '../Components/Blog/Blog';
import { useNavigation } from '@react-navigation/native';
import BannerComponent from '../Components/BannerComponent/BannerComponent';

const data = [
  { id: '1', source: require('../../assets/images/blog.png'), navigateTo: 'SeeAllBlog' },
  { id: '2', source: require('../../assets/images/company.png'), navigateTo: 'MoreInforOfTopCompany' },
  { id: '3', source: require('../../assets/images/job.png'), navigateTo: 'AllPostNewest' },
  { id: '4', source: require('../../assets/images/notify.png'), navigateTo: 'Notification' },
  { id: '5', source: require('../../assets/images/cv.png'), navigateTo: 'CV' },
  { id: '6', source: require('../../assets/images/apply.png'), navigateTo: 'ManageJobApplication' },
  { id: '7', source: require('../../assets/images/same.png'), navigateTo: 'JobFit' },
  { id: '8', source: require('../../assets/images/view.png'), navigateTo: 'Bookmark' },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  // modify color status 
  StatusBar.setBackgroundColor('#fff');

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.navigateTo)}
      style={styles.wrapper}
    >
      <Image source={item.source} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={styles.container}
      >
        <View>
          <View style={{
            height: 200,
          }}>
            <BannerComponent />
          </View>
          <View style={{
            backgroundColor: '#FFFAE6',
            position: 'relative',
            paddingBottom: 10,
          }}>
            <View style={styles.input}>
              <View style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'center',
              }}>
                <AntDesign name="search1" size={24} color="black" />
                <TextInput
                  onTouchStart={() => {
                    navigation.navigate('Search');
                  }}
                  placeholder="Search"
                />
              </View>
            </View>
            <View style={{
              marginHorizontal: 30,
              paddingBottom: 10,
              marginTop: 20,
            }}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={4}
                columnWrapperStyle={styles.flexItem}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        <NewJob />
        <Company />
        <Blog />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#white',
    paddingTop: 30,
  },
  header: {
    height: 100,
    backgroundColor: 'gray',
    position: 'fixed',
  },
  input: {
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    position: 'absolute',
    top: -30,
    width: '95%',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 35,
    height: 35,
    objectFit: 'fill',
  },
  wrapper: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#242670',
    borderWidth: 0.5,
  },
  flexItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  }
});

