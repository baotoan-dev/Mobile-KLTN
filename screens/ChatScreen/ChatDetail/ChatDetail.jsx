import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import ContentChatDetail from '../ContentChatDetail/ContentChatDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getChatMessageAction } from '../../../redux/store/Chat/chatSlice';
import InputChatBottom from '../InputChatBottom/InputChatBottom';
import { ChatContext } from '../../../contex/ChatContex';
import { connectToSocket } from '../../../utils/Chat';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { chatApi } from '../../../api/chat/chatApi';

export default function ChatDetail(prop) {
  const [socketInstance, setSocketInstance] = useState(null);
  const [messageText, setMessageText] = React.useState('')
  const [openModalLeft, setOpenModalLeft] = React.useState(false);
  const { userId, postId } = prop.route.params;
  const dispatch = useDispatch();
  const message = useSelector(state => state.chat.messages);
  const [listMessage, setListMessage] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const {
    userInfoChat,
    setSendMessages,
    sendMessages,
    receivedMessages,
    setReceivedMessages,
  } = useContext(ChatContext);


  useEffect(() => {
    dispatch(getChatMessageAction(userId, postId, 'vi'));
  }, [sendMessages, setListMessage])

  useEffect(() => {
    dispatch(getChatMessageAction(userId, postId, 'vi'));
  }, [receivedMessages, setReceivedMessages])

  useEffect(() => {
    dispatch(getChatMessageAction(userId, postId, 'vi'));
  }, [userId, postId])

  useEffect(() => {
    if (message) {
      setListMessage(message);
    }
  }, [message])

  useEffect(() => {
    let isMounted = true;

    const initializeSocket = async () => {
      try {
        const socketInstance = await connectToSocket();

        if (isMounted && socketInstance) {
          socketInstance.on("server-send-message-to-receiver", (data) => {
            setReceivedMessages(
              [
                ...receivedMessages,
                data,
              ]
            );
          });
          socketInstance.on("server-send-message-was-sent", (data) => {
            setSendMessages(
              [
                ...sendMessages,
                data,
              ]
            );
          });
          setSocketInstance(socketInstance);
        }
      } catch (error) {
        console.error("Error initializing socket:", error);
      }
    }

    initializeSocket();

    return () => {
      isMounted = false;

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

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    if (status === 'granted') {
      const response = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        multiple: true,
      });

      if (!response.cancelled) {
        const formData = new FormData();

        formData.append('images', {
          uri: response.uri,
          name: response.name,
          type: response.mimeType,
        });

        const res = await chatApi.uploadImageChat(formData);

        if (res.data && res.data.code === 200) {
          setSelectedImage(res.data.data[0]);
        }
      }
    }
  };

  const handleSendPhoto = async () => {
    await openImageLibrary();
    if (selectedImage && socketInstance) {
      socketInstance.emit("client-send-message", {
        receiverId: userId,
        files: selectedImage ? [selectedImage] : [],
        createdAt: Date.now(),
        type: "url",
        postId: postId,
      });
    }
  }


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
        handleSendPhoto={handleSendPhoto}
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
