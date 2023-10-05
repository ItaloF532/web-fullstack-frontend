import { Link } from "react-router-dom";
import UserIcon from "../../assets/UserIcon";
import { ListUserChatsDTO } from "../../infra/controllers/ChatController";
import "./style.css";
import React from "react";

export type UserChatListProps = {
  chats: ListUserChatsDTO;
  loading: boolean;
};

const UserChatList: React.FC<UserChatListProps> = ({ chats, loading }) => {
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
            <Link
              key={index}
              to={`/chat/${chat.id}`}
              className="chat-list-item"
            >
              <div className="user-icon">
                {partner.profileImage ? (
                  <img
                    className="user-image"
                    src={partner.profileImage}
                    alt="User"
                  ></img>
                ) : (
                  <UserIcon />
                )}
              </div>
              <p> {partner?.username} </p>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default UserChatList;
