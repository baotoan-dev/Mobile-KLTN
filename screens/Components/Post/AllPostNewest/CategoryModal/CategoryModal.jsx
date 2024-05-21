import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { MaterialIcons } from '@expo/vector-icons';
import ListParentCategory from './ListParentCategory/ListParentCategory';

export default function CategoryModal({
    showModalCategory,
    setShowModalCategory,
    dataCategoryFilter,
    setDataCategoryFilter,
}) {
    const [search, setSearch] = React.useState('')
    return (
        <View>
            <Modal
                isVisible={showModalCategory}
                onBackdropPress={() => setShowModalCategory(false)}
                style={styles.bottomModal}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={{
                            marginLeft: 5,
                            fontWeight: 'bold',
                            fontSize: 17,
                        }}>
                            Chọn ngành nghề
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                setShowModalCategory(false);
                            }}
                        >
                            <MaterialIcons name="cancel" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.input}>
                        <TextInput
                            placeholder="Tìm kiếm ngành nghề"
                            onChangeText={(text) => setSearch(text)}
                            style={{
                                borderWidth: 0.5,
                                borderColor: 'black',
                                padding: 5,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                    <ScrollView>
                        <ListParentCategory
                            search={search}
                            dataCategoryFilter={dataCategoryFilter}
                            setDataCategoryFilter={setDataCategoryFilter}
                            setShowModalCategory={setShowModalCategory}
                        />
                    </ScrollView>
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
        marginTop: 20,
        paddingHorizontal: 10,
        height: '70%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    input: {
        marginVertical: 10,
    },
})