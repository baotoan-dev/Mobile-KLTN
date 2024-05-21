import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadCVFromMobile({
    setIsCheckUploadCV,
    isCheckUploadCV,
    filePdf, 
    setFilePdf,
    setTypeApplication
}) {

    useEffect(() => {
        if (isCheckUploadCV) {
            setTypeApplication('upload')
        }
        else {
            setTypeApplication(null)
        }
    }, [isCheckUploadCV])
    
    const handleUploadCV = async () => {
        try {
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
            }

            let result = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true
            });
            
            if (result && result.type === 'success') {
                setFilePdf({
                    uri: result.uri,
                    name: result.name,
                    type: 'application/pdf'
                })
            }
        } catch (error) {
            console.error('Error while handling document upload:', error);
        }
    }
    return (
        <View style={[styles.container, {
            marginTop: 20,
        }]}>
            <View style={styles.flexItem}>
                <RadioButton
                    value="first"
                    status={isCheckUploadCV ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsCheckUploadCV(!isCheckUploadCV)
                    }}
                />
                <Text>
                    Tải CV từ điện thoại
                </Text>
            </View>
            {
                (isCheckUploadCV && !filePdf) && (
                    <TouchableOpacity
                        onPress={() => {
                            handleUploadCV();
                        }}
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            marginHorizontal: 10,
                            padding: 30,
                            borderRadius: 5
                        }}>
                        <AntDesign name="clouduploado" size={24} color="blue" />
                        <View>
                            <Text style={{
                                fontWeight: 'bold',
                                marginTop: 10
                            }}>Nhấn để tải lên</Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: 'gray',
                                marginTop: 5
                            }}>
                                (Hỗ trợ định dạng: PDF, DOCX, DOC)
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            {
                (isCheckUploadCV && filePdf) && (
                    <TouchableOpacity
                        onPress={() => {
                            setFilePdf(null);
                        }}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            marginHorizontal: 10,
                            borderRadius: 3,
                            marginTop: 10
                        }}>
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <Text 
                                style={{
                                    color: '#5755FE',
                                    fontWeight: 'bold',
                                }}
                            >
                                {filePdf?.name}
                            </Text>
                        </View>
                        <View>
                            <AntDesign name="close" size={20} color="gray" />
                        </View>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingVertical: 10,
    },
    flexItem: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})