import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../../redux/store/Profile/profileSilce';
import RecentCVApplication from './RecentCVApplication/RecentCVApplication';
import AllCVFromProfile from './AllCVFromProfile/AllCVFromProfile';
import UploadCVFromMobile from './UploadCVFromMobile/UploadCVFromMobile';
import Notice from './Notice/Notice';
import { applicationsApi } from '../../../api/applications/applicationsApi';

export default function Application(prop) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const id = prop.route.params.id;
  const profile = useSelector(state => state.profile.profile);
  const [isCheckRecentCV, setIsCheckRecentCV] = React.useState(false);
  const [isCheckAllCV, setIsCheckAllCV] = React.useState(false);
  const [isCheckUploadCV, setIsCheckUploadCV] = React.useState(false);
  const [loadingApplication, setLoadingApplication] = React.useState(false);
  const [filePdf, setFilePdf] = React.useState(null);
  const [idFromCVAll, setIdFromCVAll] = React.useState(null);
  const [idFromCVRecent, setIdFromCVRecent] = React.useState(null);
  const [typeApplication, setTypeApplication] = React.useState(null);

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

  const handleApplication = async () => {
    const formData = new FormData();

    formData.append('type', typeApplication);
    formData.append('postId', id);

    if (typeApplication === 'near' || typeApplication === 'all') {
      formData.append('idCv', typeApplication === 'near' ? idFromCVRecent : idFromCVAll);
    }

    if (typeApplication === 'upload') {
      if (!filePdf) {
        Alert.alert('Thông báo', 'Vui lòng chọn file PDF');
        return;
      }
      formData.append('pdf', filePdf);
    }

    setLoadingApplication(true);

    const res = await applicationsApi.applyAplication(formData);

    if (res && res.data && res.data.code === 201) {
      setLoadingApplication(false);
      ToastAndroid.show('Ứng tuyển thành công', ToastAndroid.SHORT);
      navigation.goBack();
    }
  }
  return (
    <View style={styles.container}>
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
            setIdFromCVRecent={setIdFromCVRecent}
            setIsCheckRecentCV={setIsCheckRecentCV}
            isCheckRecentCV={isCheckRecentCV}
            profile={profile}
            setTypeApplication={setTypeApplication}
          />
          <AllCVFromProfile
            setIdFromCVAll={setIdFromCVAll}
            setIsCheckAllCV={setIsCheckAllCV}
            isCheckAllCV={isCheckAllCV}
            profile={profile}
            setTypeApplication={setTypeApplication}
          />
          <UploadCVFromMobile
            setIsCheckUploadCV={setIsCheckUploadCV}
            isCheckUploadCV={isCheckUploadCV}
            filePdf={filePdf}
            setFilePdf={setFilePdf}
            setTypeApplication={setTypeApplication}
          />
        </View>
      </View>
      <View style={styles.contentBottom}>
        <Notice />
      </View>
      <View style={{
        position: 'absolute',
        bottom: 10,
        width: '100%'
      }}>
        <TouchableOpacity 
        onPress={() => {
          handleApplication();
        }}
        style={{
          backgroundColor: '#5755FE',
          padding: 15,
          alignItems: 'center',
          marginHorizontal: 15,
          borderRadius: 5,
          marginTop: 20
        }}>
          <Text style={{
            color: 'white',
            fontWeight: 'bold'
          }}>Ứng tuyển</Text>
        </TouchableOpacity>
      </View>
      {
        loadingApplication && (
          <View style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100
          }}>
            <ActivityIndicator size="large" color="#5755FE" />
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    position: 'relative',
    height: '100%',
    backgroundColor: 'white',
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