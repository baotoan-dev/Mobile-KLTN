import { View, Text, StyleSheet, TouchableOpacity, Platform, PermissionsAndroid, Alert, ToastAndroid, Image } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { cvProfileApi } from '../../../api/cv-profile/cvProfileApi';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileAction } from '../../../redux/store/Profile/profileSilce';

export default function ModalAddCv({
    showModalAddCv,
    setShowModalAddCv
}) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)
    const [filePdf, setFilePdf] = React.useState(null)
    const [cvIndex, setCvIndex] = React.useState(0)

    useEffect(() => {
        dispatch(getProfileAction('vi'))
    }, [])

    useEffect(() => {
        if (profile) {
            // get item have cvIndex highest
            let maxIndex = 0;
            profile.profilesCvs.forEach((item, index) => {
                if (item.cvIndex > maxIndex) {
                    maxIndex = item.cvIndex
                }
            })

            setCvIndex(maxIndex)
        }
    }, [profile])

    const requestStoragePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Permission Required',
                        message: 'This app needs access to your storage to upload CVs.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied', 'You need to grant storage permission to upload CVs.');
                    return false;
                }
                return true;
            } catch (err) {
                console.warn(err);
                Alert.alert('Permission Error', 'An error occurred while requesting storage permission.');
                return false;
            }
        }
        return true;
    };


    const handleUploadCv = async () => {
        try {
            // const permissionGranted = await requestStoragePermission();

            // if (!permissionGranted) {
            //     return;
            // }

            let result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true
            });

            if (result && result.type === 'success') {
                setFilePdf({
                    uri: result.uri,
                    name: result.name,
                    type: result.mimeType
                })
            }

            const formData = new FormData();

            formData.append('name', filePdf?.name);
            formData.append('file', filePdf);
            formData.append('cvIndex', cvIndex + 1);
            formData.append('templateId', 0);
            formData.append('device', 1);
            formData.append('type', 0);

            const res = await cvProfileApi.createCv(formData)

            if (res && res.data.statusCode === 201) {
                dispatch(getProfileAction('vi'))
                setShowModalAddCv(false)
                ToastAndroid.show('Thêm CV thành công', ToastAndroid.SHORT);
            }

        } catch (error) {
            console.error('Error while handling document upload:', error);
        }
    }
    return (
        <View>
            <Modal
                isVisible={showModalAddCv}
                onBackdropPress={() => setShowModalAddCv(false)}
                onSwipeComplete={() => setShowModalAddCv(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View style={styles.container}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderBottomColor: 'gray',
                        backgroundColor: '#FFF2E1',
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>
                            Thêm CV mới
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModalAddCv(false)
                            }}
                            style={{
                                marginLeft: 'auto'
                            }}>
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        padding: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 20
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ThemeCvList')
                            }}
                        >
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../../../assets/upload.png')}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'contain'
                                    }}
                                />
                                <Text style={styles.title}>
                                    Thêm CV mới
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleUploadCv()
                            }}
                        >
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../../../assets/select.png')}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: 'contain'
                                    }}
                                />
                                <Text style={styles.title}>
                                    Chọn CV từ máy
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
        width: '100%',
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '30%',
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 5
    },
    flexItem: {

    }
})
