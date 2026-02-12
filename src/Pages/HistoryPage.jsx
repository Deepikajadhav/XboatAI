import { useContext } from "react";
import { Link } from "react-router-dom";
import { ChatContext } from "../context/chatContext";

const HistoryPage = () => {
  const { conversations } = useContext(ChatContext);

  return (
    <div className="HistoryPage">

      <header>
        <h1>Past Conversations</h1>
      </header>

      <nav>
        <Link to="/">New Chat</Link>
      </nav>

      {conversations.map((conv) => (
        <div key={conv.id}>
          {conv.messages.map((msg, index) => (
            <p key={index}>{msg.text}</p>
          ))}
        </div>
      ))}

    </div>
  );
};

export default HistoryPage;