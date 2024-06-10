import { View, StyleSheet, FlatList, Text, Image } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import moment from 'moment';

export default function ContentChatDetail({ listMessage }) {
    const [accountId, setAccountId] = useState('');
    const flatListRef = useRef(null);

    useEffect(() => {
        SecureStore.getItemAsync("accountId").then((data) => {
            setAccountId(data);
        });
    }, []);

    const scrollToBottom = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToBottom();
        }, 200); 

        return () => clearTimeout(timer);
    }, [listMessage]);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd();
        }
    }, [listMessage]);

    return (
        <FlatList
            ref={flatListRef}
            style={styles.container}
            data={listMessage}
            onContentSizeChange={scrollToBottom}
            onLayout={() => setTimeout(scrollToBottom, 100)} 
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
                                backgroundColor: item.sender_id === accountId ? '#A3D8FF' : '#EEEEEE',
                                padding: 10,
                                borderRadius: 10,
                                maxWidth: '100%',
                            }}>
                                {item.type === 'text' && (
                                    <Text style={{ color: 'black' }}>
                                        {item.message}
                                    </Text>
                                )}
                                {(item.type === 'url' || item.type === 'image') && (
                                    <Image
                                        style={{
                                            width: 200,
                                            height: 200,
                                            borderRadius: 10,
                                        }}
                                        source={{ uri: item.image }}
                                    />
                                )}
                            </View>
                            <Text style={{
                                fontSize: 10,
                                color: 'gray',
                                marginTop: 5,
                            }}>
                                {moment(item.created_at).format('HH:mm')}
                            </Text>
                        </View>
                    </View>
                );
            }}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 100,
    },
});
