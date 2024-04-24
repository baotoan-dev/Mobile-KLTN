import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { avatarApi } from '../../../api/profile/avatar/avatarApi';
import { Buffer } from "buffer";

export default function HeaderProfile({ profile, isScrolling }) {
    const [image, setImage] = useState(null);

    const imageToBlob = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename = uri.split('/').pop();
        const ext = filename.split('.').pop();
        const mimeType = `image/${ext}`;
        ;
        return new File([blob], filename, { type: mimeType });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            // base64: true,
            quality: 1,
        });

        if (!result.cancelled) {
            const file = await imageToBlob(result.assets[0].uri);

            const formData = new FormData();
            formData.append('images', file);

            console.log(formData);

            try {
                const response = await avatarApi.updateAvatar(formData);
                console.log('Response:', response);
            } catch (error) {
                console.error('Error updating avatar:', error);
            }
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
                                source={{ uri: profile.avatarPath }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    pickImage();
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
                                color: 'blue',
                                marginTop: 10,
                            }}>
                                {profile.name}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
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
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 10,
        borderColor: 'red',
        borderWidth: 0.6,
        position: 'relative'
    },
})