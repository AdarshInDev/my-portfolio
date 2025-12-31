
import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([
        { role: 'model', text: "System Online. I am Adarsh's AI. Ask me about his skills or projects." }
    ]);
    const [isOpen, setIsOpen] = useState(false); // Can also persist this if needed

    const addMessage = (message) => {
        setMessages(prev => [...prev, message]);
    };

    return (
        <ChatContext.Provider value={{ messages, setMessages, addMessage, isOpen, setIsOpen }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
