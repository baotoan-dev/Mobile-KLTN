import { View, ScrollView, Image, Text, TextInput } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Company from '../Components/Company/Company';
import NewJob from '../Components/NewJob/NewJob';
import Blog from '../Components/Blog/Blog';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View
        style={styles.container}
      >
        <View>
          <View style={{
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,

          }}>
            <Image source={{ uri: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1711324800&semt=sph' }} style={{ width: 70, height: 50 }} />
            <View>
              <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: 'black',
                fontStyle: 'italic',
              }}>
                Find your favorite jobs
              </Text>
            </View>
          </View>

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
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
  },
  header: {
    height: 100,
    backgroundColor: 'gray',
    position: 'fixed',
  },
  input: {
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 20,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 6,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  }
});

