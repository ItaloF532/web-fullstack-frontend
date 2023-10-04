import "./style.css";
import React, { useState } from "react";
import UserChatList from "../../components/UserChatList/UserChatList";
import CreateChatModal from "../../components/CreateChatModal/CreateChatModal";
import ChatController from "../../infra/controllers/ChatController";

const ChatListPage: React.FC = () => {
  const chatController = new ChatController();
  const [showModal, setShowModal] = useState(false);

  const openCreateModal = () => {
    setShowModal(true);
  };

  const onCloseCreateModal = () => {
    setShowModal(false);
  };

  const handleChatCreation = async (partnerId: string) => {};

  return (
    <>
      {showModal && (
        <div className="modal-container">
          <CreateChatModal
            show={showModal}
            chatController={chatController}
            onCreateChat={() => {}}
            closeCallback={onCloseCreateModal}
          />
        </div>
      )}

      <div className="chat-list-container">
        <div className="chat-list">
          <h2>User Chat List</h2>
          <button onClick={openCreateModal}>Create new chat</button>
          <UserChatList />
        </div>
      </div>
    </>
  );
};

export default ChatListPage;
