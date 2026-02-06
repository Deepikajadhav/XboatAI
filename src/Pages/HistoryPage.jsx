 import { useContext } from "react";
import { ChatContext } from "../context/chatContext";

const HistoryPage = () => {
  const { conversations } = useContext(ChatContext);

  return (
    <>
      <h1>Conversation History</h1>
      {conversations.map(conv => (
        <div key={conv.id}>
          {conv.messages.map(msg => (
            <p key={msg.id}>{msg.text}</p>
          ))}
          <p>Rating: {conv.rating} ⭐</p>
          <p>Feedback: {conv.subjectiveFeedback}</p>
        </div>
      ))}
    </>
  );
};

export default HistoryPage;
