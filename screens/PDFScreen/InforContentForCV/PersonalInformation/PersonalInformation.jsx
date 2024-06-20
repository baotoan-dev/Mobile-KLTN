import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Platform, TextInput, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { createCvInformationAction, getCvInformationAction } from '../../../../redux/store/CvInFormation/cvInformationSlice';
import { createCvInformation } from './helpers/CreateCvInformation';
import { TYPE_PERSONAL } from '../constant/constantContentCv';
import { getProfileAction } from '../../../../redux/store/Profile/profileSilce';
import Toast from 'react-native-toast-message';

export default function PersonalInformation(prop) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { cvIndexParent } = prop.route.params;
    const cvInformation = useSelector(state => state.cvInformation.cvInformation);
    const profile = useSelector(state => state.profile.profile);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [link, setLink] = React.useState('');
    const [intent, setIntent] = React.useState('');
    const [listImage, setListImage] = React.useState({});
    const [part, setPart] = React.useState(0);
    const [row, setRow] = React.useState(0);
    const [col, setCol] = React.useState(0);
    const [cvIndex, setCvIndex] = React.useState(0);
    const [avatarPath, setAvatarPath] = React.useState(null);

    useEffect(() => {
        dispatch(getProfileAction('vi'))
    }, [cvIndexParent])

    useEffect(() => {
        dispatch(getCvInformationAction(cvIndexParent))
    }, [cvIndexParent]);

    useEffect(() => {
        if (cvInformation && cvInformation.data) {
            setName(cvInformation?.data?.name);
            setEmail(cvInformation?.data?.email);
            setPhone(cvInformation?.data?.phone);
            setAddress(cvInformation?.data?.address);
            setLink(cvInformation?.data?.link);
            setIntent(cvInformation?.data?.intent);
            setPart(cvInformation?.data?.part ? cvInformation?.data?.part : 0);
            setRow(cvInformation?.data?.row ? cvInformation?.data?.row : 0);
            setCol(cvInformation?.data?.col ? cvInformation?.data?.col : 0);
            setAvatarPath(cvInformation?.data?.avatar ? cvInformation?.data?.avatar : null);
        }

    }, [cvInformation])

    const handleUploadImage = async () => {
        try {
            // if (Platform.OS === 'android') {
            //     const granted = await PermissionsAndroid.request(
            //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            //         {
            //             title: 'Permission Required',
            //             message: 'This app needs access to your storage to upload images.',
            //             buttonNeutral: 'Ask Me Later',
            //             buttonNegative: 'Cancel',
            //             buttonPositive: 'OK',
            //         },
            //     );
            //     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            //         Alert.alert('Permission Denied', 'You need to grant storage permission to upload images.');
            //         return;
            //     }
            // }

            let result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: true
            });
            if (result && result.canceled === false) {
                setListImage({
                    uri: result.assets[0].uri,
                    name: result.assets[0].name,
                    type: 'image/*'
                })
            }
        } catch (error) {
            console.error('Error while handling document upload:', error);
        }
    }

    const handleSavePersonalInformation = () => {
        const formData = createCvInformation(name, email, phone, address, link, intent, TYPE_PERSONAL, listImage, row, part, col, cvIndex, avatarPath);

        dispatch(createCvInformationAction(formData)).then(() => {
            dispatch(getCvInformationAction(cvIndexParent));
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Thông báo',
                text2: 'Lưu thông tin cá nhân thành công!',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginLeft: 5,
                }}>Thông tin cá nhân</Text>
            </View>
            <ScrollView style={styles.content}>
                {/* Image */}
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    alignSelf: 'center',
                    marginTop: 20,
                }}>
                    <Image
                        source={(cvInformation && cvInformation?.data && cvInformation?.data?.avatar)
                            ? { uri: cvInformation?.data?.avatar } : ((listImage && listImage.uri) ? { uri: listImage.uri }
                                : require('../../../../images/default_image.png'))}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            margin: 10,
                            overflow: 'hidden',
                        }}
                    >
                    </Image>
                    <TouchableOpacity
                        onPress={() => {
                            handleUploadImage();
                        }}
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            borderRadius: 50,
                            padding: 5,
                            zIndex: 1000,
                        }}>
                        <MaterialIcons name="camera-alt" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {/* name */}
                <View style={{
                    paddingHorizontal: 10,
                    marginTop: 10,
                }}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Họ và tên
                            </Text>
                            <FontAwesome name="asterisk" size={10} color="red" style={{
                                marginLeft: 5,
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <AntDesign name="user" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập họ và tên..."
                                value={name}
                                onChangeText={(text) => {
                                    setName(text);
                                }}
                            />
                        </View>
                    </View>
                    {/* email */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Email
                            </Text>
                            <FontAwesome name="asterisk" size={10} color="red" style={{
                                marginLeft: 5,
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <Fontisto name="email" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập email..."
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                }}
                            />
                        </View>
                    </View>
                    {/* phone */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Phone
                            </Text>
                            <FontAwesome name="asterisk" size={10} color="red" style={{
                                marginLeft: 5,
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <Fontisto name="phone" size={20} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập số điện thoại..."
                                value={phone}
                                onChangeText={(text) => {
                                    setPhone(text);
                                }}
                            />
                        </View>
                    </View>
                    {/* address */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Địa chỉ
                            </Text>
                            <FontAwesome name="asterisk" size={10} color="red" style={{
                                marginLeft: 5,
                            }} />
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <FontAwesome name="address-book-o" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập địa chỉ..."
                                value={address}
                                onChangeText={(text) => {
                                    setAddress(text);
                                }}
                            />
                        </View>
                    </View>
                    {/* link */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Link
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <FontAwesome name="link" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập link..."
                                value={link}
                                onChangeText={(text) => {
                                    setLink(text);
                                }}
                            />
                        </View>
                    </View>
                    {/*  itent */}
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                            }}>
                                Mục tiêu
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: 0.2,
                            borderRadius: 5,
                            padding: 5,
                            marginTop: 5,
                        }}>
                            <FontAwesome name="bullseye" size={24} color="black" style={{
                                marginRight: 5,
                            }} />
                            <TextInput
                                placeholder="Nhập mục tiêu..."
                                value={intent}
                                onChangeText={(text) => {
                                    setIntent(text);
                                }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => {
                    handleSavePersonalInformation();
                }}
                style={styles.bottom}>
                <Text style={{
                    fontWeight: 'bold',
                    padding: 10,
                    borderRadius: 5,
                    borderWidth: 0.2,
                    borderColor: 'gray',
                    width: '90%',
                    textAlign: 'center',
                    backgroundColor: '#BED7DC',
                }}>
                    Lưu
                </Text>
            </TouchableOpacity>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: 'gray',
        paddingHorizontal: 10,
        height: 70
    },
    content: {
        height: '90%',
    },
    bottom: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})