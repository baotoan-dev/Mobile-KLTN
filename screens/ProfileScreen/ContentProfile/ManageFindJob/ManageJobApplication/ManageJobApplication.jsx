import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Tab } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ManageJobApplication() {
    const navigation = useNavigation();
    const [index, setIndex] = React.useState(0);

    return (
        <View>
            <View style={styles.header}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                    paddingVertical: 20,
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 16,
                        marginLeft: 10,
                        fontWeight: 'bold',
                    }}>Quản lý ứng tuyển</Text>
                </View>
            </View>
            <Tab
                value={index}
                onChange={setIndex} dense
                style={{backgroundColor: 'white'}}
            >
                <Tab.Item title="7 ngày">
                    <Text>7 ngày</Text>
                </Tab.Item>
                <Tab.Item title="30 ngày">
                    <Text>30 ngày</Text>
                </Tab.Item>
                <Tab.Item title="Tất cả">
                    <Text>Tất cả</Text>
                </Tab.Item>
            </Tab>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#e0e0e0',
    }
})