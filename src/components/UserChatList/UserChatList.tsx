import { Link } from "react-router-dom";
import UserIcon from "../../assets/UserIcon";
import { ListUserChatsDTO } from "../../infra/controllers/ChatController";
import "./style.css";
import React from "react";
import { useAuth } from "../../context/auth";

export type UserChatListProps = {
  chats: ListUserChatsDTO;
  loading: boolean;
};

const UserChatList: React.FC<UserChatListProps> = ({ chats, loading }) => {
  const { userId } = useAuth();

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
        // eslint-disable-next-line array-callback-return
        chats.map((chat, index) => {
          const partnerIndex = chat?.users?.findIndex(
            (user) => user.id !== userId
          );
          const partner = chat.users?.[partnerIndex];
          const selectedChat = {
            id: chat.id,
            partner,
          };

          if (!!partner) {
            return (
              <Link
                key={index}
                to={`/chat/${chat.id}`}
                state={selectedChat}
                className="chat-list-item"
              >
                <div className="user-icon">
                  {partner?.profileImage ? (
                    <img
                      className="user-image"
                      src={partner?.profileImage}
                      alt="User"
                    ></img>
                  ) : (
                    <UserIcon />
                  )}
                </div>
                <p> {partner?.username} </p>
              </Link>
            );
          }
        })
      )}
    </div>
  );
};

export default UserChatList;
