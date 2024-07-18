import { useDispatch, useSelector } from 'react-redux';
import { updateProfileJobAction } from '../../../../redux/store/Profile/UpdateProfileJob/updateProfileJob';
import { getProfileAction } from '../../../../redux/store/Profile/profileSilce';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeadingContentProfile from '../HeadingContentProfile/HeadingContentProfile';
import { AntDesign } from '@expo/vector-icons';
import ModalVerifytAction from './ModalVerifytAction/ModalVerifytAction';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ManageRecord() {
    const navigation = useNavigation();
    const [showModalSearch, setShowModalSearch] = useState(false);
    const [countCvSearch, setCountCvSearch] = useState(0);
    const [checkedItems, setCheckedItems] = useState({});
    const [isEnableSearch, setIsEnableSearch] = useState(false);
    const [cvIds, setCvIds] = useState([]);
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);

    useEffect(() => {
        dispatch(getProfileAction('vi'));
    }, [isEnableSearch]);

    useEffect(() => {
        if (profile && profile.isSearch === 1) {
            setIsEnableSearch(true);
        }
    }, [profile]);

    const handleEnableSearch = () => {
        if (profile.isActive === 0) {
            ToastAndroid.showWithGravity(
                "Tài khoản chưa được kích hoạt",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
              setTimeout(() => {
                navigation.navigate("ActiveAccount", {
                  email: profile.email,
                });
              }, 2000);
              setShowModalSearch(false);
            return  
        }
        if (cvIds.length === 0) {
            ToastAndroid.show('Vui lòng chọn ít nhất 1 CV', ToastAndroid.SHORT);
            return;
        }
        dispatch(updateProfileJobAction({
            cvIds: cvIds,
            isSearch: 1
        })).then(() => {
            dispatch(getProfileAction('vi'));
            setIsEnableSearch(true);
            setShowModalSearch(false);
        });
    }

    const toggleSwitch = () => {
        if (profile && profile.isSearch === 0) {
            setShowModalSearch(true);
        }
        else {
            dispatch(updateProfileJobAction({
                cvIds: [],
                isSearch: 0
            })).then(() => {
                setIsEnableSearch(false);
                setCheckedItems({});
            });
        }
    };

    useEffect(() => {
        if (profile && profile.profilesCvs) {
            const count = profile.profilesCvs.filter((item) => item.status === 1).length;
            setCountCvSearch(count);
        }
    }, [profile]);

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
                            <AntDesign name="creditcard" size={24} color="#242670" />
                            <Text style={{
                                marginLeft: 10,
                                fontWeight: 'bold',
                                color: '#242670',
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
                                value={profile.isSearch === 1}
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
                                            color: '#242670',
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
        borderTopWidth: 0.5
    }
});
