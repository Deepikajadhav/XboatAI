 import React, { useState } from "react";
import ChatWindow from "../Components/chatWindow/chatWindow";
import ChatInput from "../Components/chatInput/chatInput";
import Sidebar from "../Components/sideBar/sideBar";
import sampleResponses from "../data/sampleData.json"; 
import "./ChatPage.css";  
import title from "../Assets/Bot AI (1).png";
import logo from "../Assets/Group 1000011097.png";  
import { useContext } from "react";
import { ChatContext } from "../context/chatContext";



const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [activeConversation, setActiveConversation] = useState([]); 
  const [savedConversations, setSavedConversations] = useState([]); 

  const [message, setMessage] = useState([]);

  const handleSend = (message) => {
    console.log("Message from ChatInput:", message);

    setMessage((prev) => [
      ...prev,
      { sender: "user", text: message }
    ]);
  };


const messages = activeConversation?.messages ?? []; 

const hasMessages = activeConversation?.messages?.length > 0;



  // get active conversation
  const activeConversations = conversations.find(
    (conv) => conv.id === activeId
  );

  // create new chat
  const startNewChat = () => { 
    const newChat = { 
      id: Date.now().toString(),
      messages: [],
      rating: null,
      feedbackText: ""
        };
    setConversations(prev => [...prev, newChat]);
    setActiveId(newChat.id);
  };   

  const getAIResponse = (question) => {
    return sampleResponses[question]
      ? sampleResponses[question]
      : "Sorry, Did not understand your query!";
  };  

   if (!activeConversation) {
  startNewChat();
  return;
}   


  // send message
  const sendMessage = (text) => {
    //if (!activeConversation) return;

    const userMsg = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString()
    };  

      const normalizedText = text.trim().toLowerCase();

      const aiReply =
      Object.entries(sampleResponses).find(
      ([key]) => key.toLowerCase() === normalizedText
    )?.[1] || "Sorry, Did not understand your query!";


    const aiMsg = {
      sender: "ai",
      text: aiReply,
      time: new Date().toLocaleTimeString(),
      liked: null
    };

    const updatedConversations = conversations.map((conv) =>
      conv.id === activeId
        ? { ...conv, messages: [...conv.messages, userMsg, aiMsg] }
        : conv
    );

    setConversations(updatedConversations);  


  };  
   
  const saveConversation = () => {
  // if (!activeConversation || activeConversation.messages.length === 0) return;

  setSavedConversations((prev) => [
    ...prev,
    {
      ...activeConversation,
      savedAt: new Date().toISOString()
    }
  ]);

  setActiveConversation(null); // clear current chat
};


  const onFeedback = (messageIndex, value) => {
  setConversations((prevConversations) =>
    prevConversations.map((conv) =>
      conv.id === activeId
        ? {
            ...conv,
            messages: conv.messages.map((msg, i) =>
              i === messageIndex
                ? { ...msg, feedback: value } // 👈 LIKE or DISLIKE saved here
                : msg
            )
          }
        : conv
    )
  );
};


  return (
    <>
    <div className="chat-page">
        {/* LEFT */}  
        <div className="left">
      <Sidebar
        conversations={conversations}
        startNewChat={startNewChat}
        setActiveId={setActiveId}
      />  
      </div> 
      
     
      <div className="chat-main"> 
         <img src={title} alt="Title" className="title" /> 
        {/* 🔑 THIS IS THE LINE YOU ASKED ABOUT */}

        {messages.length === 0 ? (
          <div className="welcome-placeholder"> 
            <h2>How Can I Help You Today?</h2>  
            <img src={logo} alt="logo" className="logo"/>

      <div className="suggestions">
        <div className="card">Hi, what is the weather 
            <p>get AI immediate AI generated response</p>
        </div>
        <div className="card">Hi, what is my location
            <p>get AI immediate AI generated response</p>
        </div>
        <div className="card">Hi, what is the temperature 
            <p>get AI immediate AI generated response</p>
        </div>
        <div className="card">Hi, how are you 
            <p>get AI immediate AI generated response</p>
        </div>
      </div>
          </div>
       ) : (
       <ChatWindow messages={messages} onFeedback = {onFeedback} />
       )}  

        
        <ChatInput onSend={sendMessage}
          activeConversation={activeConversation}
          saveConversation={saveConversation} />
      </div>  
       </div> 
      </>
    
  );
};

export default ChatPage;
