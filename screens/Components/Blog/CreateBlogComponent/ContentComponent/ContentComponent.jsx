import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Platform, PermissionsAndroid, Alert, Image } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Entypo } from '@expo/vector-icons';

export default function ContentComponent({
    images,
    setTitle,
    setImages,
    setContent,
}) {
    const handleUploadImage = async () => {
        if (Platform.OS === 'android') {
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
                return;
            }

            let result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: true,
                multiple: true
            });

            if (result && result.type === 'success') {
                setImages([...images, {
                    uri: result.uri,
                    name: result.name,
                    type: 'image/*'
                }])
            }
        }
    }

    return (
        <ScrollView>
            <View>
                <View style={styles.title}>
                    <Text style={styles.fbold}>Tiêu đề</Text>
                    <Octicons style={styles.ml} name="north-star" size={12} color="red" />
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Tiêu đề"
                        onChangeText={(text) => setTitle(text)}
                        multiline={true}
                        numberOfLines={1}
                    />
                </View>
            </View>
            <View>
                <View style={styles.title}>
                    <Text style={styles.fbold}>
                        Nội dung
                    </Text>
                    <Octicons style={styles.ml} name="north-star" size={12} color="red" />
                </View>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Nội dung"
                        onChangeText={(text) => setContent(text)}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
            </View>
            <View>
                <View style={styles.title}>
                    <Text style={styles.fbold}>
                        Hình ảnh
                    </Text>
                    <Octicons style={styles.ml} name="north-star" size={12} color="red" />
                </View>
                {/* image */}
                <View style={styles.images}>
                    {
                        images.length === 0 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    handleUploadImage()
                                }}
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                <Entypo name="upload" size={24} color="black" />
                                <Text style={{
                                    marginTop: 10
                                }}>Chưa có hình ảnh</Text>
                            </TouchableOpacity>
                        )
                            :
                            (
                                <View>
                                    <Image
                                        source={{ uri: images[0].uri }}
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    />

                                    <TouchableOpacity
                                        onPress={() => {
                                            setImages([])
                                        }}
                                        style={{
                                            position: 'absolute',
                                            right: 5,
                                            top: 5,
                                            zIndex: 1,
                                            backgroundColor: 'red',
                                            padding: 5,
                                            borderRadius: 50
                                        }}>
                                        <Entypo name="cross" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            )
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '95%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    title: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 10
    },
    ml: {
        marginLeft: 5
    },
    fbold: {
        fontWeight: 'bold'
    },
    images: {
        height: 200,
        width: '95%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center',
    }
})