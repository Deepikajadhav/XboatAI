import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [savedConversations, setSavedConversations] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        activeConversation,
        setActiveConversation,
        savedConversations,
        setSavedConversations
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
