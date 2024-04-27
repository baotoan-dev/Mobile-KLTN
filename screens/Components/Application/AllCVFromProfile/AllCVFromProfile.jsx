import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';
import ModalAllCvFromProfile from './ModalAllCvFromProfile/ModalAllCvFromProfile';

export default function AllCVFromProfile({
    setIsCheckAllCV,
    isCheckAllCV,
    profile,
    setIdFromCVAll,
    setTypeApplication
}) {
    const [listCv, setListCv] = React.useState([])
    const [idSelected, setIdSelected] = React.useState('')
    const [showModalCvFromProfile, setShowModalCvFromProfile] = React.useState(false)

    useEffect(() => {
        if (profile && profile.profilesCvs && profile.profilesCvs.length > 0) {
            const newCvFilter = profile.profilesCvs.filter(cv => cv.status === 1 && cv.id === idSelected)[0];
            setListCv(newCvFilter)
            setIdFromCVAll(idSelected)
        }
    }, [idSelected, isCheckAllCV]);

    useEffect(() => {
        if (isCheckAllCV) {
            setTypeApplication('all')
        }
        else {
            setTypeApplication(null)
        }
    }, [isCheckAllCV])

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
                (isCheckAllCV && listCv) && (
                    <TouchableOpacity
                        onPress={() => setShowModalCvFromProfile(true)}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            marginHorizontal: 10,
                            borderRadius: 3,
                        }}>
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <Text>
                                {listCv?.name}
                            </Text>
                            <Text style={{
                                fontSize: 12,
                                color: 'gray',
                                marginTop: 5
                            }}>
                                {`Cập nhật lần cuối: ${moment(listCv?.updatedAt).format('DD/MM/YYYY')}`}
                            </Text>
                        </View>
                        <View>
                            <AntDesign name="caretdown" size={20} color="gray" />
                        </View>
                    </TouchableOpacity>
                )
            }
            {
                (isCheckAllCV && !listCv) && (
                    <View>
                        <View style={{
                            justifyContent: 'center',
                            marginTop: 10,
                            paddingHorizontal: 10
                        }}>
                            <Text style={{
                                fontSize: 13,
                                color: 'gray'
                            }}>Chưa có CV nào</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => setShowModalCvFromProfile(true)}
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
                                    <Text>
                                        Chọn CV
                                    </Text>
                                </View>
                                <View>
                                    <AntDesign name="caretdown" size={20} color="gray" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            <ModalAllCvFromProfile
                idSelected={idSelected}
                setIdSelected={setIdSelected}
                showModalCvFromProfile={showModalCvFromProfile}
                setShowModalCvFromProfile={setShowModalCvFromProfile}
                profile={profile}
            />
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