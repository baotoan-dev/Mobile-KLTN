import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function InputChatBottom({
    messageText,
    setMessageText,
    handleSendMessage,
    handleSendPhoto,
}) {
    const [checkClick, setCheckClick] = React.useState(false)

    return (
        <View style={styles.container}>
            {
                !checkClick && (
                    <View style={styles.left}>
                        {/* <TouchableOpacity>
                            <MaterialIcons name="keyboard-voice" size={24} color="black" />
                        </TouchableOpacity> */}
                        <TouchableOpacity>
                            <AntDesign name="camerao" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleSendPhoto()}
                        >
                            <AntDesign name="picture" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )
            }
            <View style={[styles.right, {
                width: !checkClick ? '80%' : '100%'
            }]}>
                <TextInput
                    onTouchStart={() =>
                        setCheckClick(true)
                    }
                    onBlur={() =>
                        setCheckClick(false)
                    }
                    placeholder="Nhập tin nhắn"
                    value={messageText}
                    onChangeText={text => setMessageText(text)}
                />
                {
                    messageText.length > 0 && (
                        <TouchableOpacity
                            onPress={() => handleSendMessage()}
                        >
                            <Ionicons name="send-sharp" size={24} color="black" />
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '20%'
    },
    right: {
        borderWidth: 0.5,
        borderRadius: 50,
        padding: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})