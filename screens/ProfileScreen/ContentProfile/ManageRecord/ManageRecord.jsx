import { View, Text, StyleSheet, Switch } from 'react-native'
import React from 'react'
import HeadingContentProfile from '../HeadingContentProfile/HeadingContentProfile'
import { AntDesign } from '@expo/vector-icons';

export default function ManageRecord() {
    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.container}>
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
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    }
})