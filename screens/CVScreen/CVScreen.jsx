import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import ContentCvList from './ContentCvList/ContentCvList';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import { FAB } from 'react-native-elements';
import ModalAddCv from './ModalAddCv/ModalAddCv';

export default function CVScreen() {
  const [checkShow, setCheckShow] = React.useState(false)
  const profile = useSelector(state => state.profile.profile)
  const [showModalAddCv, setShowModalAddCv] = React.useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfileAction('vi'))
  }, [])


  return (
    <View>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{
          fontSize: 16,
          marginLeft: 10,
          fontWeight: 'bold'
        }}>Quản lý CV</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.headerContent}>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'gray'
          }}>
            Thư viện CV
          </Text>
          {
            checkShow ? <AntDesign name="appstore-o" size={24} color="black" onPress={() => setCheckShow(!checkShow)} /> : <Feather name="list" size={24} color="black" onPress={() => setCheckShow(!checkShow)} />
          }
        </View>
        {
          profile && profile.profilesCvs && (
            <Text style={{
              fontSize: 12,
              color: 'gray',
              marginVertical: 10
            }}>
              Tìm thấy {profile.profilesCvs.length} CV
            </Text>
          )
        }
        <View>
          {
            profile && <ContentCvList checkShow={checkShow} profile={profile} />
          }
        </View>
      </ScrollView>
      {
        showModalAddCv && <ModalAddCv
          showModalAddCv={showModalAddCv}
          setShowModalAddCv={setShowModalAddCv}
        />
      }
      <FAB
        onPress={() => setShowModalAddCv(true)}
        placement="right"
        buttonStyle={{
          backgroundColor: '#FF6347'
        }}
        icon={{
          name: "add",
          size: 15,
          color: "white"
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray'
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    padding: 10,
    height: '90%'
  }
})