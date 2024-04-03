import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import HeadingContentProfile from '../HeadingContentProfile/HeadingContentProfile'
import { AntDesign } from '@expo/vector-icons';
import ModalVerifytAction from './ModalVerifytAction/ModalVerifytAction';
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../../../redux/store/Profile/profileSilce';
import { updateProfileJobAction } from '../../../../redux/store/Profile/UpdateProfileJob/updateProfileJob';

export default function ManageRecord() {
    const [showModalSearch, setShowModalSearch] = React.useState(false);
    const [countCvSearch, setCountCvSearch] = React.useState(0);
    const [checkedItems, setCheckedItems] = React.useState({});
    const [cvIds, setCvIds] = React.useState([])
    const disPatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)

    const handleEnableSearch = () => {
        if (cvIds.length === 0) {
            ToastAndroid.show('Vui lòng chọn ít nhất 1 CV', ToastAndroid.SHORT)
            return
        }
        disPatch(updateProfileJobAction({
            cvIds: cvIds,
            isSearch: 1
        }))
        disPatch(getProfileAction('vi'))
        setShowModalSearch(false)
    }

    const toggleSwitch = () => {
        console.log('toggleSwitch', profile.isSearch);
        if (profile && profile.isSearch === 0) {
            setShowModalSearch(true)
        }
        else {
            disPatch(updateProfileJobAction({
                cvIds: [],
                isSearch: 0
            }))
            disPatch(getProfileAction('vi'))
            setCheckedItems(checkedItems => {
                return Object.keys(checkedItems).reduce((acc, key) => {
                    acc[key] = false
                    return acc
                }, {})
            }
            )
        }
    };

    useEffect(() => {
        disPatch(getProfileAction('vi'))
    }, [])

    useEffect(() => {
        if (profile && profile.profilesCvs) {
            const count = profile.profilesCvs.filter((item) => item.isPublic).length
            setCountCvSearch(count)
        }
    }, [profile])

    return (
        <View style={styles.container}>
            {profile && (
                <View>
                    <HeadingContentProfile left='Quản lý hồ sơ' right='' />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <AntDesign name="creditcard" size={24} color="blue" />
                            <Text style={{
                                marginLeft: 10,
                                fontWeight: 'bold',
                            }}>
                                Trạng thái làm việc
                            </Text>
                        </View>
                        <View>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={profile.isSearch ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={profile.isSearch === 1 ? true : false}
                            />
                        </View>
                    </View>
                    {
                        countCvSearch > 0 && (
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        // fontWeight: 'bold',
                                    }}>
                                        Đã công khai {countCvSearch} hồ sơ
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setShowModalSearch(true)}
                                    >
                                        <Text style={{
                                            color: 'blue',
                                            marginLeft: 5,
                                        }}>
                                            thay đổi
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    <ModalVerifytAction
                        setShowModalSearch={setShowModalSearch}
                        showModalSearch={showModalSearch}
                        profile={profile}
                        handleEnableSearch={handleEnableSearch}
                        setCvIds={setCvIds}
                        cvIds={cvIds}
                        checkedItems={checkedItems}
                        setCheckedItems={setCheckedItems}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        paddingBottom: 20,
        borderTopColor: 'gray',
        borderTopWidth: 0.5,
    }
})