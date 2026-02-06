 const Message = ({ msg, onFeedback }) => {
  return (
    <div className={`message ${msg.sender}`}>
      {msg.sender === "ai" && <span>Soul AI</span>}
      <p>{msg.text}</p>

      {msg.sender === "ai" && (
        <div className="hoverFeedback">
          <button onClick={() => onFeedback(msg.id, "like")}>👍</button>
          <button onClick={() => onFeedback(msg.id, "dislike")}>👎</button>
        </div>
      )}
    </div>
  );
};

export default Message;
