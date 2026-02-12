import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  //const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [savedConversations, setSavedConversations] = useState([]); 

  const [conversations, setConversations] = useState(() => {
  const saved = localStorage.getItem("conversations");
  return saved ? JSON.parse(saved) : [];
});  

const [activeId, setActiveId] = useState(() => {
  return localStorage.getItem("activeId");
});
  
 useEffect(() => {
  localStorage.setItem(
    "conversations",
    JSON.stringify(conversations)
  );
}, [conversations]);

useEffect(() => {
  if (activeId !== null) {
    localStorage.setItem("activeId", activeId);
  }
}, [activeId]);


  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        activeConversation,
        setActiveConversation,
        activeId,
        setActiveId,
        savedConversations,
        setSavedConversations
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
