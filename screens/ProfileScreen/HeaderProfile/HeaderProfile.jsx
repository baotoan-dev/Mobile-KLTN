import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { avatarApi } from '../../../api/profile/avatar/avatarApi';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../../redux/store/Profile/profileSilce';
import Toast from 'react-native-toast-message';

export default function HeaderProfile({ isScrolling }) {
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const profile = useSelector(state => state.profile.profile);
    const [dataProfile, setDataProfile] = useState({});

    useEffect(() => {
        dispatch(getProfileAction('vi'));
    }, []);

    useEffect(() => {
        if (profile) {
            setDataProfile(profile);
        }
    }, [profile]);


    const openImageLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

        if (status === 'granted') {
            const response = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: true,
            });

            if (!response.cancelled) {
                setImage([{
                    uri: response.assets[0].uri,
                    name: response.assets[0].name,
                    mimeType: 'image/*'
                }]);
                await pickImage();
            }
        }
    };

    const pickImage = async () => {
        const formData = new FormData();

        image?.forEach((item) => {
            formData.append('images', {
                uri: item.uri,
                name: item.name,
                type: item.mimeType,
            });
        });

        try {
            const response = await avatarApi.updateAvatar(formData);
            if (response && response.code === 200) {
                setImage(null);
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Cập nhật ảnh đại diện thành công',
                });
                dispatch(getProfileAction('vi'));
            }

        } catch (error) {
            console.error('Error updating avatar:', error);
        }

    };

    const renderHeader = () => {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignContent: 'flex-start',
            }}>
                <ImageBackground
                    source={{ uri: 'https://www.w3schools.com/w3images/mountains.jpg' }}
                    style={{
                        width: '100%',
                        height: 130,
                        position: 'relative',
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.avatar}>
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 50,
                                }}
                                source={{ uri: dataProfile.avatarPath }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    openImageLibrary();
                                }}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: 'white',
                                    borderRadius: 50,
                                    width: 30,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Entypo name="camera" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: 'column',
                                marginLeft: 15,
                            }}
                        >
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>Xin chào</Text>

                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#242670',
                                marginTop: 10,
                            }}>
                                {dataProfile.name}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
                <Toast ref={(ref) => Toast.setRef(ref)} />
            </View>
        )
    }

    const renderFixedHeader = () => {
        return (
            <View style={{
                // fixed in top of screen
                position: 'absolute',
                top: 0,
                width: '100%',
                backgroundColor: 'white',
                zIndex: 100,
                elevation: 100,
                shadowColor: 'black',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <View style={{
                        marginTop: 20,
                        width: '20%',
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 100,
                            }}
                            source={{ uri: profile.avatarPath }}
                        />
                    </View>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'black',
                        marginTop: 10,
                    }}>
                        {
                            profile.name
                        }
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            {
                isScrolling ? renderFixedHeader() : renderHeader()
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        bottom: '-50%',
        position: 'absolute',
        width: '80%',
        height: 120,
        left: '10%',
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1000000000000000,
        borderColor: '#242670',
        borderWidth: 0.6,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 10,
        borderColor: '#242670',
        borderWidth: 0.6,
        position: 'relative'
    },
})