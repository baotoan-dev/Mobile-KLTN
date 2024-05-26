import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import { companyApi } from '../../../../api/company/companyApi';

export default function ModalFIlterSizeComponent({
    showModalCompanySize,
    setShowModalCompanySize,
    companySize,
    setCompanySize
}) {
    const [allDataCompanySize, setAllDataCompanySize] = React.useState([]);
    const fetchData = async () => {
        const res = await companyApi.getAllCompanySize();

        if (res && res.status === 200) {
            setAllDataCompanySize(res.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <View>
            <Modal
                isVisible={showModalCompanySize}
                onBackdropPress={() => setShowModalCompanySize(false)}
                onSwipeComplete={() => setShowModalCompanySize(false)}
                swipeDirection={['down']}
                animationIn={"bounceInUp"}
                animationOut={"bounceOutDown"}
                style={styles.bottomModal}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.titleHeader}>
                            Chọn kích thước công ty
                        </Text>
                        <TouchableOpacity onPress={() => setShowModalCompanySize(false)}>
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={allDataCompanySize}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                            onPress={() => {
                                if (companySize.id === item.id) {
                                    setCompanySize({});
                                }
                                else {
                                    setCompanySize(item);
                                    setShowModalCompanySize(false);
                                }
                            }}
                            style={styles.item}>
                                <Text>
                                    {item.nameText}
                                </Text>
                                {
                                    companySize.id === item.id && (
                                        <MaterialIcons name="check" size={24} color="black" />
                                    )
                                }
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </Modal>
        </View>
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
        height: '35%',
        borderRadius: 10,
    },
    titleHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})