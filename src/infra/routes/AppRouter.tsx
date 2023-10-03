import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/login/LoginPage";
import PrivateRoute from "./PrivateRoute";
import ChatPage from "../../pages/chat/ChatPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
