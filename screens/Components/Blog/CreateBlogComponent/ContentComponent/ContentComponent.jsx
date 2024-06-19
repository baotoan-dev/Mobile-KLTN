import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Platform, PermissionsAndroid, Alert, Image, Button } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Octicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { Entypo } from '@expo/vector-icons';
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor';
import Toast from 'react-native-toast-message';

export default function ContentComponent({
    images,
    setTitle,
    setImages,
    setContent,
    title,
    content,
    setDeleteImages
}) {
    const richText = useRef();

    useEffect(() => {
        if (richText.current && content) {
            richText.current.setContentHTML(content);
        }
    }, [content]);


    const handleUploadImage = async () => {
        const limitImage = 1;
        // if (Platform.OS === 'android') {
        //     const granted = await PermissionsAndroid.request(
        //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //         {
        //             title: 'Permission Required',
        //             message: 'This app needs access to your storage to upload CVs.',
        //             buttonNeutral: 'Ask Me Later',
        //             buttonNegative: 'Cancel',
        //             buttonPositive: 'OK',
        //         },
        //     );
        //     if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        //         Alert.alert('Permission Denied', 'You need to grant storage permission to upload CVs.');
        //         return;
        //     }

        //     let result = await DocumentPicker.getDocumentAsync({
        //         type: 'image/*',
        //         copyToCacheDirectory: true,
        //         multiple: true
        //     });

        //     if (result && result.type === 'success') {
        //         setImages([...images, {
        //             uri: result.uri,
        //             name: result.name,
        //             type: 'image/*'
        //         }])
        //     }
        // }

        let result = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            copyToCacheDirectory: true,
            multiple: true
        });

        if (result && result.canceled === false) {
            setImages([...images, {
                uri: result.assets[0].uri,
                name: result.assets[0].name,
                type: 'image/*'
            }])
        }

        if (images.length > limitImage) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Lỗi',
                text2: `Chỉ được chọn tối đa ${limitImage} hình ảnh`,
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            });
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
                        value={title}
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
                <View style={{
                    height: 200,
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 5,
                    marginVertical: 10,
                    marginHorizontal: 10
                }}>
                    <ScrollView style={styles.editorContainer}>
                        <RichEditor
                            ref={richText}
                            onChange={(text) => setContent(text)}
                            style={styles.richEditor}
                            placeholder="Nội dung"
                        />
                    </ScrollView>
                    <RichToolbar
                        editor={richText}
                        actions={[
                            actions.insertImage,
                            actions.setBold,
                            actions.setItalic,
                            actions.setUnderline,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.alignLeft,
                            actions.alignCenter,
                            actions.alignRight,
                        ]}
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
                                            setDeleteImages(images[0].id)
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
            <Toast ref={(ref) => Toast.setRef(ref)} />
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