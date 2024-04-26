import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import ContentChatDetail from '../ContentChatDetail/ContentChatDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getChatMessageAction } from '../../../redux/store/Chat/chatSlice';
import InputChatBottom from '../InputChatBottom/InputChatBottom';
import { ChatContext } from '../../../contex/ChatContex';
import { connectToSocket, socket } from '../../../utils/Chat';

export default function ChatDetail(prop) {
  const [socketInstance, setSocketInstance] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messageText, setMessageText] = React.useState('')
  const [openModalLeft, setOpenModalLeft] = React.useState(false);
  const { userId, postId } = prop.route.params;
  const dispatch = useDispatch();
  const message = useSelector(state => state.chat.messages);
  const [listMessage, setListMessage] = React.useState([]);
  const {
    userInfoChat,
    setSendMessages,
    sendMessages,
    receivedMessages,
    setReceivedMessages,
  } = useContext(ChatContext);

  useEffect(() => {
    dispatch(getChatMessageAction(userId, postId, 'vi'));
  }, [userId, postId])
    
  useEffect(() => {
    if (message) {
      setListMessage(message);
    }
  }, [message])

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        const socketInstance = await connectToSocket();
        console.log('socket instance:', socketInstance);
        if (socketInstance) {
          socketInstance.on("server-send-message-to-receiver", (data) => {
            setReceivedMessages(data);
          });
          socketInstance.on("server-send-message-was-sent", (data) => {
            setSendMessages(data);
          });
          setSocketInstance(socketInstance);
        }
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    }

    if (!socketInstance) {
      initializeSocket();
    }

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    }
  }, []);

  const handleSendMessage = () => {
    if (messageText !== "" && socketInstance) {
      setMessageText("");
      socketInstance.emit("client-send-message", {
        receiverId: userId,
        message: messageText,
        createdAt: Date.now(),
        type: "text",
        postId: postId,
      });
      dispatch(getChatMessageAction(userId, postId, 'vi'));
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.header}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            onPress={() => {
              setOpenModalLeft(true);
            }}
            style={{
              padding: 5,
              backgroundColor: '#EEEEEE',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Entypo name="menu" size={24} color="black" />
          </TouchableOpacity>
          <Text style={{
            fontSize: 16,
            marginLeft: 5,
            fontWeight: 'bold',
          }}>
            Đoạn chat
          </Text>
        </View>
      </View>
      <ContentChatDetail listMessage={listMessage} />
      <InputChatBottom
        messageText={messageText}
        setMessageText={setMessageText}
        handleSendMessage={handleSendMessage}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: 40,
    padding: 10,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  }
})
