import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatProvider } from "./context/chatContext";
import ChatPage from "./Pages/chatPage.jsx"; 
import HistoryPage from "./Pages/HistoryPage.jsx";

function App() {
  return (
    <ChatProvider>
      <BrowserRouter> 
      <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;
