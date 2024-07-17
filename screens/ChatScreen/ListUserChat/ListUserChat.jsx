import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground, RefreshControl } from 'react-native'
import React from 'react'
import { chatApi } from '../../../api/chat/chatApi';
import { Entypo } from '@expo/vector-icons';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function ListUserChat() {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);
    const [listUserChat, setListUserChat] = React.useState([]);
    const fetchData = async () => {
        const response = await chatApi.getUserChated('vi');

        if (response && response.data.code === 200) {
            setListUserChat(response.data.data);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, [])

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
        setRefreshing(false);
    }
    
    return (
        <ScrollView 
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={styles.container}>
            <FlatList
                data={listUserChat}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ChatDetail', {
                                    id: item.id,
                                    userId: item.user_id,
                                    postId: item.post_id,
                                    imageParent: item.image ? item.image : 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1702047527/images/avatar/1702047524545-59c27fe7-3919-4a8d-a150-984d9428f184.jpg',
                                    nameParent: item.company_name,
                                })
                            }}
                            style={styles.item}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    width: 60,
                                    height: 60,
                                }}>
                                    <Image
                                        source={item.image ? { uri: item.image } : { uri: 'https://res.cloudinary.com/ddwjnjssj/image/upload/v1702047527/images/avatar/1702047524545-59c27fe7-3919-4a8d-a150-984d9428f184.jpg' }}
                                        style={{ width: 60, height: 60, borderRadius: 30 }}
                                    >
                                    </Image>
                                    <View style={styles.isOnline}>
                                        {item.is_online ? (
                                            <Entypo name="controller-record" size={18} color="green" />
                                        ) : (
                                            <Entypo name="controller-record" size={18} color="gray" />
                                        )}
                                    </View>
                                </View>
                                <View style={{
                                    marginLeft: 15
                                }}>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.name}>
                                        {item.company_name}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={{
                                            fontSize: 14,
                                            color: 'gray',
                                        }}>{item.message}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{
                                    fontSize: 12,
                                    color: 'gray',
                                }}>
                                    {moment(item.created_at).format('HH:mm')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item.id}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    isOnline: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent',
    }
})