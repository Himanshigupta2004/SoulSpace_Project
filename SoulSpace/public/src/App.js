import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { MainPage } from "./pages/MainPage";
import HomePage from "./pages/Home/HomePage";
import Logout from "./components/Logout";
import Index1 from "./pages/Room/RoomPage";
import RoomPage from "./pages/Room/RoomPage"; // Correct the import
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Render Navbar along with HomePage */}
        <Route 
          path="/MainPage" 
          element={
            <>
              <Navbar />
              <MainPage />
            </>
          } 
        />
        <Route 
          path="/Profile" 
          element={
            <>
              <Navbar />
              <Profile />
            </>
          } 
        />

        {/* Other routes without Navbar */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/index1" element={<Index1 />} />
        <Route path="/Room/:roomId" element={<RoomPage />} /> {/* Use RoomPage */}
   
      </Routes>
    </BrowserRouter>
  );
}
