import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import ContentChatDetail from '../ContentChatDetail/ContentChatDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getChatMessageAction } from '../../../redux/store/Chat/chatSlice';
import InputChatBottom from '../InputChatBottom/InputChatBottom';
import { ChatContext } from '../../../contex/ChatContex';
import { connectToSocket } from '../../../utils/Chat';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { chatApi } from '../../../api/chat/chatApi';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function ChatDetail(prop) {
  const navigation = useNavigation();
  const [socketInstance, setSocketInstance] = useState(null);
  const [messageText, setMessageText] = React.useState('')
  const [openModalLeft, setOpenModalLeft] = React.useState(false);
  const { userId, postId, imageParent, nameParent } = prop.route.params;
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

      if (!response.assets[0].canceled) {
        const formData = new FormData();

        formData.append('images', {
          uri: response.assets[0].uri,
          name: response.assets[0].name,
          type: response.assets[0].mimeType,
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
        files: selectedImage,
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
          justifyContent: 'space-between',
        }}>
          <View style={styles.left}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                marginRight: 10,
              }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View>
              <Image
                source={{ uri: imageParent }}
                style={{ width: 40, height: 40, borderRadius: 20, objectFit: 'scale-down' }}
              />
            </View>
            <View style={{
              marginLeft: 5
            }}>
              <Text style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}>
                {nameParent?.length > 10 ? nameParent.slice(0, 10) + '...' : nameParent}
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity style={styles.right}>
            <AntDesign name="infocirlce" size={24} color="black" />
          </TouchableOpacity> */}
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
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {

  },
})
