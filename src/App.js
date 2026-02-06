import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatPage from "./Pages/chatPage.jsx";
import {ChatProvider} from "./context/chatContext.jsx";
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
