import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function HeaderProfile({ profile, isScrolling }) {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
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
        zIndex: 1000,
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