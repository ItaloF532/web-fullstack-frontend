import "./style.css";
import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import UserChatList from "../../components/UserChatList/UserChatList";

const ChatListPage: React.FC = () => {
  return (
    <div className="chat-list-container">
      <div className="chat-list">
        <h2>User Chat List</h2>
        <UserChatList />
      </div>
    </div>
  );
};

export default ChatListPage;
