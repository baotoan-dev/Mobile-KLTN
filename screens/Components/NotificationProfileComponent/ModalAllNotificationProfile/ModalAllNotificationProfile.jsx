import { View, Text, StyleSheet, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CategoryModal from '../../Post/AllPostNewest/CategoryModal/CategoryModal';
import LocationModal from '../../Post/AllPostNewest/LocationModal/LocationModal';
import { keywordNotificationApi } from '../../../../api/keywordNotification/keywordNotificationApi';
import { getAllKeywordNotificationAction } from '../../../../redux/store/KeywordNotificaiton/getAllKeywordNotification/getAllKeywordNotificationSlice';
import { useDispatch } from 'react-redux';
import { getProfileAnalyticsAction } from '../../../../redux/store/Profile/ProfileAnalytic/profileAnalyticSlice';

export default function ModalAllNotificationProfile({
    showModalAddKeyWordNotify,
    setShowModalAddKeyWordNotify
}) {
    const dispatch = useDispatch();
    const [showModalLocation, setShowModalLocation] = React.useState(false);
    const [showModalCategory, setShowModalCategory] = React.useState(false);
    const [nameKeyWord, setNameKeyWord] = React.useState('')
    const [dataCategoryFilter, setDataCategoryFilter] = React.useState({})
    const [dataLocationFilter, setDataLocationFilter] = React.useState({})

    const handleSave = async () => {
        // check data

        if (!nameKeyWord) {
            alert('Vui lòng nhập từ khóa');
            return;
        }
        if (!dataCategoryFilter.parent_category) {
            alert('Vui lòng chọn ngành nghề');
            return;
        }
        if (!dataLocationFilter.name) {
            alert('Vui lòng chọn vị trí');
            return;
        }

        // call api
        const res = await keywordNotificationApi.createKeyWordNotification(
            nameKeyWord,
            dataCategoryFilter.parent_category_id,
            dataLocationFilter.id
        )

        if (res && res.data.code === 201) {
            ToastAndroid.show('Thêm thông báo thành công', ToastAndroid.SHORT);
            dispatch(getAllKeywordNotificationAction());
            dispatch(getProfileAnalyticsAction());
            setShowModalAddKeyWordNotify(false);
        }
    }

    return (
        <Modal
            isVisible={showModalAddKeyWordNotify}
            style={styles.bottomModal}
            onBackdropPress={() => setShowModalAddKeyWordNotify(false)}
        >
            <View style={styles.container}>
                <View style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                }}>
                    <View style={styles.header}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                Thêm thông báo
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModalAddKeyWordNotify(false);
                            }}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: 10,
                            }}>
                            <MaterialIcons name="cancel" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.center}>
                        <View style={{
                            height: 45,
                            margin: 12,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 5,
                            marginTop: 30,
                            borderColor: '#242670',
                        }}>
                            <TextInput
                                onChangeText={(text) => {
                                    setNameKeyWord(text);
                                }}
                                placeholder="Nhập từ khóa"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setShowModalCategory(!showModalCategory)}
                            style={{
                                height: 45,
                                margin: 12,
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderColor: '#242670',
                            }}>
                            <TextInput
                                value={dataCategoryFilter.parent_category}
                                editable={false}
                                placeholder="Chọn ngành nghề"
                            />
                            <AntDesign name="caretdown" size={17} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setShowModalLocation(!showModalLocation)}
                            style={{
                                height: 45,
                                margin: 12,
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderColor: '#242670',
                            }}>
                            <TextInput
                                value={dataLocationFilter.name}
                                editable={false}
                                placeholder="Chọn vị trí"
                            />
                            <AntDesign name="caretdown" size={17} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footer}>
                        <TouchableOpacity
                            onPress={handleSave}
                            style={{
                                backgroundColor: '#FF6347',
                                padding: 10,
                                borderRadius: 10,
                                alignItems: 'center',
                                marginHorizontal: 10,
                            }}
                        >
                            <Text style={{
                                color: 'white',
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                Lưu
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {
                showModalLocation && (
                    <LocationModal
                        showModalLocation={showModalLocation}
                        setShowModalLocation={setShowModalLocation}
                        dataLocationFilter={dataLocationFilter}
                        setDataLocationFilter={setDataLocationFilter}
                    />
                )}
            {
                showModalCategory && (
                    <CategoryModal
                        showModalCategory={showModalCategory}
                        setShowModalCategory={setShowModalCategory}
                        dataCategoryFilter={dataCategoryFilter}
                        setDataCategoryFilter={setDataCategoryFilter}
                    />
                )}
        </Modal>
    )
}


const styles = StyleSheet.create({
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '55%',
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2,
        paddingBottom: 10,
        height: '10%',
    },
    center: {
        height: '70%',
    },
    footer: {
        height: '20%',
    }
})
