import "./style.css";
import React, { useEffect, useState } from "react";
import UserChatList from "../../components/UserChatList/UserChatList";
import CreateChatModal from "../../components/CreateChatModal/CreateChatModal";
import ChatController, {
  ListUserChatsDTO,
} from "../../infra/controllers/ChatController";
import { useAuth } from "../../context/auth";
import LogOutIcon from "../../assets/LogOutIcon";
import LogOutButton from "../../components/LogOutButton/LogOutButton";

const ChatListPage: React.FC = () => {
  const chatController = new ChatController();
  const { logOutExpired } = useAuth();
  const [chats, setChats] = useState<ListUserChatsDTO>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openCreateModal = () => {
    setShowModal(true);
  };

  const onCloseCreateModal = () => {
    setShowModal(false);
  };

  const getUserChats = async (): Promise<void> => {
    try {
      setLoading(true);
      const userChats = await chatController.listUserChats();
      setChats(userChats);
    } catch (error) {
      if (error instanceof Error) {
        if (error.toString() === "Error: Invalid token!") {
          logOutExpired();
          return;
        }

        if (error.toString() === "Error: Missing authentication token!") {
          logOutExpired();
          return;
        }
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleChatCreation = async (partnerId: string) => {
    try {
      setLoading(true);
      await getUserChats();
      await chatController.createChat(partnerId);
      onCloseCreateModal();
      const userChats = await chatController.listUserChats();
      setChats(userChats);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.toString() === "Error: There is already a chat with this user!"
        ) {
          alert("There is already a chat with this user!");
          return;
        }

        if (error.toString() === "Error: Invalid token!") {
          logOutExpired();
          return;
        }

        if (error.toString() === "Error: Missing authentication token!") {
          logOutExpired();
          return;
        }
      }

      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserChats();
  }, []);

  return (
    <>
      {showModal && (
        <div className="modal-container">
          <CreateChatModal
            show={showModal}
            onCreateChat={handleChatCreation}
            chatController={chatController}
            closeCallback={onCloseCreateModal}
          />
        </div>
      )}

      <div className="chat-list-container">
        <LogOutButton />
        <div className="chat-list">
          <h2>User Chat List</h2>
          <button className="create-chat-button" onClick={openCreateModal}>
            Create new chat
          </button>
          <UserChatList chats={chats} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default ChatListPage;
