import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';

export default function ContentChatDetail({ listMessage }) {

    const [accountId, setAccountId] = React.useState('');

    React.useEffect(() => {
        SecureStore.getItemAsync("accountId").then((data) => {
            setAccountId(data);
        });
    }, [])

    return (
        <ScrollView style={styles.container}>
            {accountId && (
                <FlatList
                    data={listMessage}
                    renderItem={({ item }) => {
                        return (
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: item.sender_id === accountId ? 'flex-end' : 'flex-start',
                                marginBottom: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        backgroundColor: item.is_me ? '#0084FF' : '#EEEEEE',
                                        padding: 10,
                                        borderRadius: 10,
                                        maxWidth: '100%',
                                    }}>
                                        <Text style={{
                                            color: item.is_me ? 'white' : 'black',
                                        }}>
                                            {item.message}
                                        </Text>

                                    </View>
                                    <Text style={{
                                        fontSize: 10,
                                        color: 'gray',
                                        marginTop: 5,
                                    }}>
                                        {
                                            moment(item.created_at).format('HH:mm')
                                        }
                                    </Text>
                                </View>
                            </View>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})