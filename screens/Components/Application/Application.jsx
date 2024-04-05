import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../../redux/store/Profile/profileSilce';
import RecentCVApplication from './RecentCVApplication/RecentCVApplication';
import AllCVFromProfile from './AllCVFromProfile/AllCVFromProfile';
import UploadCVFromMobile from './UploadCVFromMobile/UploadCVFromMobile';
import Notice from './Notice/Notice';

export default function Application() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.profile);
  const [isCheckRecentCV, setIsCheckRecentCV] = React.useState(false);
  const [isCheckAllCV, setIsCheckAllCV] = React.useState(false);
  const [isCheckUploadCV, setIsCheckUploadCV] = React.useState(false);

  useEffect(() => {
    dispatch(getProfileAction('vi'))
  }, [])

  useEffect(() => {
    if (isCheckRecentCV) {
      setIsCheckAllCV(false);
      setIsCheckUploadCV(false);
    }
    if (isCheckAllCV) {
      setIsCheckRecentCV(false);
      setIsCheckUploadCV(false);
    }
    if (isCheckUploadCV) {
      setIsCheckRecentCV(false);
      setIsCheckAllCV(false);
    }
  }, [isCheckRecentCV, isCheckAllCV, isCheckUploadCV])
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          navigation.goBack();
        }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Ứng tuyển</Text>
      </View>
      <View style={styles.content}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 16,
          marginBottom: 10,
        }}>CV ứng tuyển</Text>
        <View>
          <RecentCVApplication
            setIsCheckRecentCV={setIsCheckRecentCV}
            isCheckRecentCV={isCheckRecentCV}
            profile={profile}
          />
          <AllCVFromProfile
            setIsCheckAllCV={setIsCheckAllCV}
            isCheckAllCV={isCheckAllCV}
            profile={profile}
          />
          <UploadCVFromMobile
            setIsCheckUploadCV={setIsCheckUploadCV}
            isCheckUploadCV={isCheckUploadCV}
          />
        </View>
      </View>
      <View style={styles.contentBottom}>
        <Notice />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    padding: 10,
  },
  content: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  left: {

  },
  center: {

  },
  bottom: {

  },
  contentBottom: {
    paddingHorizontal: 15,
    marginTop: 20,
  }
})