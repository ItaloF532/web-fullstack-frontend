import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/login/LoginPage";
import PrivateRoute from "./PrivateRoute";
import ChatListPage from "../../pages/chat-list/ChatList";
import ChatMessagePage from "../../pages/chat-message/ChatMessage";
import { useAuth } from "../../context/auth";

const AppRouter: React.FC = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {signed && (
          <Route
            path="/chat-list"
            element={
              <PrivateRoute>
                <ChatListPage />
              </PrivateRoute>
            }
          />
        )}
        {signed && (
          <Route
            path="/chat/:chatId"
            element={
              <PrivateRoute>
                <ChatMessagePage />
              </PrivateRoute>
            }
          />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
