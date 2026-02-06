 import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState(
    JSON.parse(localStorage.getItem("conversations")) || []
  );
  const [activeConversation, setActiveConversation] = useState(null); 
  const [savedConversations, setSavedConversations] = useState([]);

  const saveToStorage = (data) =>
    localStorage.setItem("conversations", JSON.stringify(data));

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        activeConversation,
        setActiveConversation,
        saveToStorage,
        savedConversations,
        setSavedConversations
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
