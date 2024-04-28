import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
export default function ModalActionSave({
    showModalAction,
    setShowModalAction,
    handlePrint,
    printToFile
}) {
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModalAction}
                onRequestClose={() => {
                    setShowModalAction(!showModalAction);
                }}
            >
                <View
                    style={styles.centerModal}
                >
                    <View
                        style={styles.container}
                    >
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                Chọn phương thức
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowModalAction(!showModalAction)}
                            >
                                <MaterialIcons name="cancel" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={styles.content}
                        >
                            {/* 2 action download and save */}
                            <TouchableOpacity
                                onPress={handlePrint}
                                style={styles.item}>
                                <Entypo name="print" size={24} color="black" />
                                <Text style={styles.ml}>Tải xuống</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={printToFile}
                                style={styles.item}>
                                <Entypo name="save" size={24} color="black" />
                                <Text style={styles.ml}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centerModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    container: {
        backgroundColor: "white",
        width: "80%",
        borderRadius: 10,
        alignItems: "center",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: 'gray',
        width: "100%",
        paddingBottom: 10,
        marginBottom: 10,
        backgroundColor: '#9AC8CD',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    content: {
        width: "100%",
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        width: "45%",
        backgroundColor: '#F0F8FF'
    },
    ml: {
        marginLeft: 5
    }
})