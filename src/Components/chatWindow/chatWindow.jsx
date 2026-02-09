import React, { useEffect, useRef } from "react";
import Message from "../message/message"; 
import aiAvatar from "../../Assets/Group 1000011097.png" 
import userAvatar from "../../Assets/Group 1000011096.png"
import "./chatWindow.css";

const ChatWindow = ({ messages , activeConversation,onFeedback}) => { 
return( 
    <div className="chat-window"> 
 {messages.map((msg, index) => (
  <div key={index} className={`message-row ${msg.sender === "user" ? "user" : "ai"}`}
    >   
  
     <img
            src={
              msg.sender === "user"
                ? userAvatar
                : aiAvatar
            }
            alt="avatar"
            className="avatar"
          />

          <div className="message-card">
            <span className="sender-name">
              {msg.sender === "user" ? "You" : "Soul AI"}
            </span>

    <p className="message-text">{msg.text}</p> 

    <span className="time">{msg.time}</span>

    {msg.sender === "ai" && (
      <div className="feedback">
        <button
          hidden={msg.feedback !== null}
          onClick={() => onFeedback(index, "like")}
        >
          👍     
        </button>
        <button
          hidden={msg.feedback !== null}
          onClick={() => onFeedback(index, "dislike")}
        >
         👎 
        </button>
      </div>
    )}
  </div> 
  </div>
))}  
</div> 
)
};

export default ChatWindow;
