 import { useState } from "react"; 
 import "./chatInput.css";

const ChatInput = ({ onSend, activeConversation, saveConversation }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(input.trim());
    if (!input.trim()) 
        return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-container">
       <input
        placeholder="Message Bot AI…" 
        value={input}
        onChange={(e) => setInput(e.target.value)}/>
      <button type="submit">Ask</button>
      <button  type="button"
       onClick={() => saveConversation(activeConversation)}>Save</button>
    </form>
  );
};

export default ChatInput;
