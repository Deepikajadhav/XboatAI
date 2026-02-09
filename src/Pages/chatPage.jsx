import React, { useState, useContext } from "react";
import ChatWindow from "../Components/chatWindow/chatWindow";
import ChatInput from "../Components/chatInput/chatInput";
import Sidebar from "../Components/sideBar/sideBar";
import sampleResponses from "../data/sampleData.json";
import { aiStubs } from "../data/aiStubs";
import { ChatContext } from "../context/chatContext";
import "./ChatPage.css";
import title from "../Assets/Bot AI (1).png";
import logo from "../Assets/Group 1000011097.png";

const ChatPage = () => {
  const {
    conversations,
    setConversations,
    savedConversations,
    setSavedConversations
  } = useContext(ChatContext); 
const [activeId, setActiveId] = useState(null);
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// const [message, setMessage] = useState([]);


  const activeConversation = conversations.find(
  (conv) => conv.id === activeId
);

const messages = activeConversation?.messages || [];  

console.log("activeConversation:", activeConversation);



  // Create new chat
  const startNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      messages: [],
      rating: null,
      feedbackText: ""
    };

    setConversations(prev => [...prev, newChat]); 
    setActiveId(newChat.id);
    return newChat;
  };  
  
   
const sendMessage = (text) => {
  if (!text.trim()) return;

  // 1️⃣ Create message objects first
  const userMsg = {
    sender: "user",
    text,
    time: new Date().toLocaleTimeString(),
    feedback: null
  };

  const aiMsg = {
    sender: "ai",
    text: getAIResponse(text),
    time: new Date().toLocaleTimeString(),
    feedback: null
  };

  // 2️⃣ If NO active conversation → create one WITH both messages
  if (!activeId) {
    const newConversation = {
      id: Date.now().toString(),
      messages: [userMsg, aiMsg],
      rating: null,
      feedbackText: ""
    };

    setConversations(prev => [...prev, newConversation]);
    setActiveId(newConversation.id);
    return;
  }

  // 3️⃣ If conversation exists → append both messages
  setConversations(prev =>
    prev.map(conv =>
      conv.id === activeId
        ? { ...conv, messages: [...conv.messages, userMsg, aiMsg] }
        : conv
    )
  );
};
 


   const getAIResponse = (userText) => {
  const text = userText.toLowerCase().trim();
  let reply = null;

    for (const item of aiStubs) {
  if (item.keywords.some(k => text.includes(k))) {
    return item.reply;
  }
}


  return reply || "Sorry, I did not understand your query!";
};

  // Save conversation
  const saveConversation = () => {
    if (!activeConversation || messages.length === 0) return;

    setSavedConversations(prev => [
      ...prev,
      { ...activeConversation, savedAt: new Date().toISOString() }
    ]);

  };  

  console.log("conversations:", conversations);
console.log("activeId:", activeId);
console.log("activeConversation:", activeConversation);



  return (
    <div className="chat-page">
      
        <div className={`left ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar
          conversations={conversations}
          startNewChat={startNewChat}
          setActiveId={setActiveId} 
        /> 
      </div> 
      {/* Overlay */}
     {isSidebarOpen && (
      <div
          className="overlay"
          onClick={() => setIsSidebarOpen(false)}
      />
      )}

      <div className="chat-main"> 
         <div className="mobile-header">
      {/* <button
        className="menu-btn"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button> */}
        <img src={title} alt="Title" className="title" />

        {!activeConversation ? (
          <div className="welcome-placeholder">
            <h2>How Can I Help You Today?</h2>
            <img src={logo} alt="logo" className="logo" />

            <div className="suggestions">
              <div className="card">Hi, what is the weather?</div>
              <div className="card">Hi, what is my location?</div>
              <div className="card">Hi, what is the temperature?</div>
              <div className="card">Hi, how are you?</div>
            </div>
          </div>
        ) : ( 
          <div className="chat-bar">
          <ChatWindow messages={activeConversation.messages} 
           activeConversation={activeConversation}
          //onFeedback={handleFeedback}  
          /> 
           </div> 
        )}  
       
       <div className="chat-input">
        <ChatInput
          onSend={sendMessage}
          saveConversation={saveConversation}
          activeConversation={activeConversation}
        /> 
        </div>
       </div>
    </div>
    </div>
  );
};

export default ChatPage;

