import React, { useState, createContext } from 'react';

export const ChatContext = createContext({
    userInfoChat: [],
    setUserInfoChat: () => { },
    sendMessages: [],
    setSendMessages: () => { },
    receivedMessages: [],
    setReceivedMessages: () => { },
    apply: false,
    setApply: () => { },
});

const ChatContextProvider = ({ children }) => {
    const [userInfoChat, setUserInfoChat] = useState([]);
    const [sendMessages, setSendMessages] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [apply, setApply] = useState(false);

    const valueChatContext = {
        userInfoChat,
        setUserInfoChat,
        sendMessages,
        setSendMessages,
        receivedMessages,
        setReceivedMessages,
        apply,
        setApply,
    };

    return (
        <ChatContext.Provider value={valueChatContext}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
