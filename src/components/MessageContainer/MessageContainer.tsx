import React, { useEffect, useMemo, useState } from "react";
import LogOutIcon from "../../assets/LogOutIcon";
import { useAuth } from "../../context/auth";
import { ChatDTO } from "../../infra/controllers/ChatMessageController";
import Cookies from "js-cookie";
import { WS_API_URL } from "../../constants";
import SendButton from "../SendButton/SendButton";

export type MessageContainerProps = {
  chatId: string;
  partnerId: string;
  messages: {
    userId: string;
    message: string;
    createdAt: Date;
  }[];
};

const MessageContainer: React.FC<MessageContainerProps> = ({
  chatId,
  messages,
  partnerId,
}) => {
  const users = new Set();
  const { userId: currentUserId } = useAuth();
  const [chat, setChat] = useState<ChatDTO>();
  const [newMessage, setNewMessage] = useState<{
    userId: string;
    message: string;
    createdAt: Date;
  }>();
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>();
  const [state, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleSendMessage = () => {
    if (socket && inputMessage && currentUserId && chat?.chatId) {
      const message = {
        chatId: chat.chatId,
        userId: currentUserId,
        message: inputMessage,
        createdAt: new Date(),
      };

      socket.send(JSON.stringify(message));
      setChat({
        chatId: chat?.chatId,
        messages: [...(chat?.messages ?? []), message],
      });
      setInputMessage("");
    }
  };

  const handleMessages = ({
    message,
    createdAt,
    chatUserId,
    messageChatId,
  }: {
    message: string;
    createdAt: string;
    chatUserId: string;
    messageChatId: string;
  }) => {
    if (messageChatId !== chatId) return;

    setNewMessage({
      userId: chatUserId,
      message,
      createdAt: new Date(createdAt),
    });
  };

  const handleWebSocketConnection = () => {
    const token = Cookies.get("token");
    const websocket = new window.WebSocket(`${WS_API_URL}?token=${token}`);

    setSocket(websocket);

    const userRef = { websocket };
    users.add(userRef);

    websocket.onopen = () => {
      console.log("opened ws connection");
    };

    websocket.onclose = (e) => {
      console.log("close ws connection: ", e.code, e.reason);
    };

    websocket.onmessage = (e) => {
      const messageFromBuffer = e.data.toString();
      const parsedMessage = JSON.parse(messageFromBuffer);

      const hasChat = !!chat;

      if (!!hasChat) return;

      const { chatId, userId: chatUserId, message, createdAt } = parsedMessage;

      if (!chatId || !chatUserId || !message || !createdAt) return;

      const messageFromChatUsers =
        currentUserId === partnerId || chatUserId === currentUserId;

      if (!messageFromChatUsers) return;

      console.log("handled");
      handleMessages({ chatUserId, message, createdAt, messageChatId: chatId });
    };

    return () => {
      websocket.close();
    };
  };

  useEffect(() => {
    setChat({
      chatId,
      messages,
    });
    handleWebSocketConnection();
  }, []);

  useEffect(() => {
    if (newMessage) {
      setChat({
        chatId: chatId,
        messages: [...(chat?.messages ?? []), newMessage!],
      });
    }
  }, [newMessage]);

  return (
    <>
      <div className="message-container">
        {chat?.messages?.length && (
          <>
            {chat?.messages?.map((message, index) => {
              const isPartnerMessage = message.userId === partnerId;
              return (
                <div
                  key={index}
                  className={
                    isPartnerMessage
                      ? "partner-message"
                      : "current-user-message"
                  }
                >
                  <p> {message.message} </p>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="input-message-container">
        <input
          type="text"
          value={inputMessage}
          required
          onChange={(e) => setInputMessage(e.target.value)}
        />

        <SendButton onTap={handleSendMessage} />
      </div>
    </>
  );
};

export default MessageContainer;
