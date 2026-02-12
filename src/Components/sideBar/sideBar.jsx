 import { useNavigate } from "react-router-dom"; 
 import logo from ".././../Assets/Group 1000011097.png"
 import edit from ".././../Assets/image 31.png"

const Sidebar = ({ conversations, startNewChat, onSelectChat }) => { 

     const navigate = useNavigate();
     return (
     <div className="sidebar">   
     <div className="btns">  

      <button className ="btn-1" onClick={startNewChat} 
        style={{backgroundColor:" #e3cfe6", width:"100%"}}>
         <p>  
        <img src={logo} alt="logo" style={{ justifyContent:"flex-start",height:"45px"}}/> 
          New Chat  
        <img src={edit} alt="logo" style={{justifyContent:"flex-end",height:"25px"}} />
         </p>
      </button> 


      <button className ="btn-2" onClick={() => navigate("/history")} 
        style={{backgroundColor:" #e3cfe6 "}}>
        Past Conversations
      </button> 
      </div>


      {conversations.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className="chat-item"
        >
          Chat {String(chat.id).slice(0.8)}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
