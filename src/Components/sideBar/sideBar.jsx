 import { useNavigate } from "react-router-dom"; 
 import logo from ".././../Assets/Group 1000011097.png"

const Sidebar = ({ conversations, onNewChat, onSelectChat }) => { 

     const navigate = useNavigate();
  return (
    <div className="sidebar">  

      <button onClick={() => navigate("/")}>
         <p>  
        <img src={logo} alt="logo" style={{height:"65px"}}/> 
        New Chat
         </p>
      </button>


      <button onClick={() => navigate("/history")}>
        Past Conversations
      </button>

      {conversations.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className="chat-item"
        >
          Chat {chat.id.slice(-4)}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
