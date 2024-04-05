import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function UploadCVFromMobile({
    setIsCheckUploadCV,
    isCheckUploadCV
}) {
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
                isCheckUploadCV && (
                    <TouchableOpacity style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 10,
                        borderWidth: 0.5,
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
        paddingVertical: 10,
    },
    flexItem: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})