import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileAction } from '../../redux/store/Profile/profileSilce';
import ContentBottomPDFScreen from './ContentBottomPDFScreen/ContentBottomPDFScreen';
import ContentHeaderPDFScreen from './ContentHeaderPDFScreen/ContentHeaderPDFScreen';
import { useNavigation } from '@react-navigation/native';
import ContentCenterPDFScreen from './ContentCenterPDFScreen/ContentCenterPDFScreen';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { manipulateAsync } from 'expo-image-manipulator';

export default function PDFScreen() {
    const navigation = useNavigation();
    const [selectedPrinter, setSelectedPrinter] = useState();
    const profile = useSelector((state) => state.profile.profile);
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState(null);

    const print = async () => {
        await Print.printAsync({
            html,
            printerUrl: selectedPrinter?.url,
        });
    };

    useEffect(() => {
        dispatch(getProfileAction('vi'));
    }, [])

    useEffect(() => {
        if (profile) {
            setAvatar(profile.avatarPath);
        }
    }, [profile])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                        }}>
                            Hủy
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput
                        placeholder="Tên file"
                        style={{
                            borderWidth: 0.5,
                            borderColor: 'gray',
                            borderRadius: 5,
                            padding: 3,
                            width: 100,
                        }}
                    />
                </View>
                <TouchableOpacity onPress={print} >
                    <Text style={{
                        fontWeight: 'bold',
                    }}>
                        Lưu
                    </Text>
                </TouchableOpacity>
            </View>
            <ContentHeaderPDFScreen />
            <ContentCenterPDFScreen avatar={avatar}/>
            <ContentBottomPDFScreen />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
        justifyContent: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 10,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacer: {
        marginVertical: 10,
    },
    printer: {
        fontSize: 16,
    },
    a4Paper: {
        width: '90%',
        height: '90%',
        borderWidth: 0.5,
        borderColor: 'black',
    },
});
