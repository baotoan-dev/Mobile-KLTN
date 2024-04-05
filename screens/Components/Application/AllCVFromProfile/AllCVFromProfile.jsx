import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import ModalAllCvFromProfile from './ModalAllCvFromProfile/ModalAllCvFromProfile';

export default function AllCVFromProfile({
    setIsCheckAllCV,
    isCheckAllCV,
    profile
}) {
    const [listCv, setListCv] = React.useState({})
    const [showModalCvFromProfile, setShowModalCvFromProfile] = React.useState(false)

    useEffect(() => {
        if (profile && profile.profilesCvs && profile.profilesCvs.length > 0) {
            setListCv(profile.profilesCvs.filter(cv => cv.status === 1)[0])
        }
    }, [])

    return (
        <View style={[styles.container, {
            marginTop: 20,
        }]}>
            <View style={styles.flexItem}>
                <RadioButton
                    value="first"
                    status={isCheckAllCV ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setIsCheckAllCV(!isCheckAllCV)
                    }}
                />
                <Text>
                    CV từ thư viện của tôi
                </Text>
            </View>
            {
                isCheckAllCV && (
                    <TouchableOpacity 
                    onPress={() => setShowModalCvFromProfile(true)}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 10,
                        borderWidth: 0.3,
                        borderColor: 'gray',
                        marginHorizontal: 10,
                        borderRadius: 3,
                    }}>
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <Text>
                                {listCv.name}
                            </Text>
                            <Text style={{
                                fontSize: 12,
                                color: 'gray',
                                marginTop: 5
                            }}>
                                {`Cập nhật lần cuối: ${moment(listCv.updatedAt).format('DD/MM/YYYY')}`}
                            </Text>
                        </View>
                        <View>
                            <AntDesign name="caretdown" size={20} color="gray" />
                        </View>
                    </TouchableOpacity>
                )
            }
            <ModalAllCvFromProfile showModalCvFromProfile={showModalCvFromProfile} setShowModalCvFromProfile={setShowModalCvFromProfile} profile={profile}/>
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