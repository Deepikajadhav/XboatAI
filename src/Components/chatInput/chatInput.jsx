import { useState } from "react";
import "./chatInput.css";

const ChatInput = ({ onSend, saveConversation, activeConversation }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-container">
      <input
        placeholder="Message Bot AI…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
       // onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />

      <button type="submit">Ask</button>

      <button
        type="button"
        disabled={!activeConversation || activeConversation.messages.length === 0}
        onClick={saveConversation}
      >
        Save
      </button>
    </form>
  );
};

export default ChatInput;
