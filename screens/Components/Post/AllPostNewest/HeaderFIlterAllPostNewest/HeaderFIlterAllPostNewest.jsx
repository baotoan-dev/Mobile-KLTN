import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import LocationModal from '../LocationModal/LocationModal';
import CategoryModal from '../CategoryModal/CategoryModal';

export default function HeaderFIlterAllPostNewest() {
    const [showModalLocation, setShowModalLocation] = React.useState(false)
    const [showModalCategory, setShowModalCategory] = React.useState(false)
    return (
        <View>
            <View style={styles.input}>
                <Feather name="search" size={24} color="black" />
                <TextInput
                    style={styles.ml}
                    placeholder="Tìm kiếm"
                />
            </View>
            <View style={styles.filter}>
                <TouchableOpacity
                    onPress={() => {
                        setShowModalCategory(!showModalCategory)
                    }}
                    style={styles.item}>
                    <Text style={styles.textAl}>Chọn ngành nghề</Text>
                    <AntDesign name="caretdown" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setShowModalLocation(!showModalLocation)
                    }}
                    style={styles.item}>
                    <Text style={styles.textAl}>Chọn địa điểm</Text>
                    <AntDesign name="caretdown" size={20} color="black" />
                </TouchableOpacity>
            </View>
            {
                showModalLocation && (
                    <LocationModal
                        showModalLocation={showModalLocation}
                        setShowModalLocation={setShowModalLocation}
                    />
                )
            }
            {
                showModalCategory && (
                    <CategoryModal
                        showModalCategory={showModalCategory}
                        setShowModalCategory={setShowModalCategory}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    item: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textAl: {
        textAlign: 'center',
    },
    ml: {
        marginLeft: 5,
    }
})