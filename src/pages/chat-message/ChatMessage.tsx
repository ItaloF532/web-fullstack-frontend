import "./style.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LogOutButton from "../../components/LogOutButton/LogOutButton";
import UserIcon from "../../assets/UserIcon";
import BackButton from "../../components/BackButton/BackButton";
import ChatMessageController, {
  ChatDTO,
} from "../../infra/controllers/ChatMessageController";
import { useAuth } from "../../context/auth";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

export type MessageDTO = {
  userId: string;
  message: string;
  createdAt: string;
}[];

export type ChatMessageDTO = {
  id?: string;
  chatId?: string;
  messages?: MessageDTO;
};

const ChatMessagePage: React.FC = () => {
  const { state } = useLocation();
  const [chat, setChat] = useState<ChatDTO | null>();
  const chatMessageController = new ChatMessageController();
  const { logOutExpired } = useAuth();

  const getChatMessages = async () => {
    try {
      const chatData = await chatMessageController.getChatMessages(state.id);

      setChat(chatData);
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
    }
  };

  useEffect(() => {
    getChatMessages();
  }, []);

  return (
    <>
      <div className="chat-message-container">
        <LogOutButton />
        <BackButton path="/chat-list" />
        <div className="chat-message">
          <div className="partner-container">
            {state?.partner?.profileImage ? (
              <img
                className="user-image"
                src={state?.partner?.profileImage}
                alt="User"
              />
            ) : (
              <div className="user-image">
                {" "}
                <UserIcon />{" "}
              </div>
            )}
            <p> {state?.partner?.username} </p>
          </div>

          {state?.id && state?.partner.id && chat && (
            <MessageContainer
              chatId={state?.id}
              partnerId={state?.partner?.id}
              messages={chat?.messages}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatMessagePage;
