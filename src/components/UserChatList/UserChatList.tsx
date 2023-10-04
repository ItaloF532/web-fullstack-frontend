import UserIcon from "../../assets/UserIcon";
import ChatController, {
  ListUserChatsDTO,
} from "../../infra/controllers/ChatController";
import "./style.css";
import React, { useEffect, useState } from "react";

const UserChatList: React.FC = () => {
  const chatController = new ChatController();
  const [chats, setChats] = useState<ListUserChatsDTO>([]);
  const [loading, setLoading] = useState(true);

  const getUserChats = async (): Promise<void> => {
    const userChats = await chatController.listUserChats();
    setChats(userChats);
    setLoading(false);
  };

  useEffect(() => {
    getUserChats();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="list">
      {!chats.length ? (
        <>
          <div className="chat-list-item">
            <p> No chats found. </p>
          </div>
        </>
      ) : (
        chats.map((chat, index) => {
          const partner = chat.users?.[1];
          if (!partner) return <></>;

          return (
            <div key={index} className="chat-list-item">
              <div className="user-icon">
                {partner.profileImage ? (
                  <img src={partner.profileImage} alt="User"></img>
                ) : (
                  <UserIcon />
                )}
              </div>
              <p> {partner?.username} </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserChatList;
