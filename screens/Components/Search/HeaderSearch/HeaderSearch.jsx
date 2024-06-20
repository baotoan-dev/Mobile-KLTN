import { View, Text, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import PopularKeyowrd from '../PopularKeyowrd/PopularKeyowrd';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSearchAction } from '../../../../redux/store/Search/searchSlice';
import { useDispatch } from 'react-redux';

export default function HeaderSearch() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [search, setSearch] = React.useState('');

    const handleSearch = () => {
        AsyncStorage.setItem('keyword', search);
        dispatch(getSearchAction(
            search,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            [],
            null,
            null,
            null,
            'vi',
        ));
        navigation.navigate('SearchResult');
    }

    return (
        <View style={{
            backgroundColor: 'white',
        }}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.input}>
                    <EvilIcons name="search" size={24} color="black" />
                    <TextInput
                        onChangeText={(text) => {
                            setSearch(text);
                        }}
                        onSubmitEditing={handleSearch}
                        placeholder="Nhập từ khóa tìm kiếm..."
                    />
                </View>
            </View>
            <PopularKeyowrd />
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 0.2,
        borderColor: 'black',
        borderRadius: 5,
        marginTop: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginLeft: 10,
        marginBottom: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
    }
})
