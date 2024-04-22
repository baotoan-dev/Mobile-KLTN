import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import ContentChatDetail from '../ContentChatDetail/ContentChatDetail';
import { useSelector, useDispatch } from 'react-redux';
import { getChatMessageAction } from '../../../redux/store/Chat/chatSlice';
import InputChatBottom from '../InputChatBottom/InputChatBottom';

export default function ChatDetail(prop) {
  const [openModalLeft, setOpenModalLeft] = React.useState(false);
  const { userId, postId } = prop.route.params;
  const dispatch = useDispatch();
  const message = useSelector(state => state.chat.messages);
  const [listMessage, setListMessage] = React.useState([]);

  useEffect(() => {
    dispatch(getChatMessageAction(userId, postId, 'vi'));
  }, [userId, postId])

  useEffect(() => {
    if (message) {
      setListMessage(message);
    }
  }, [message])

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
      <InputChatBottom />
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