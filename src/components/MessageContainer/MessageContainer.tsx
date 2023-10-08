import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import SendButton from "../SendButton/SendButton";

export type MessageContainerProps = {
  chatId: string;
  socket: WebSocket;
  partnerId: string;
  messages: {
    userId: string;
    message: string;
    createdAt: Date;
  }[];
};

const MessageContainer: React.FC<MessageContainerProps> = ({
  chatId,
  socket,
  messages,
  partnerId,
}) => {
  const { userId } = useAuth();
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<
    {
      userId: string;
      message: string;
      createdAt: Date;
    }[]
  >(messages);

  const handleSendMessage = () => {
    if (socket && inputMessage && userId && chatId) {
      const message = {
        chatId: chatId,
        userId,
        message: inputMessage,
        createdAt: new Date(),
      };

      socket.send(JSON.stringify(message));
      setInputMessage("");
    }
  };

  const handleOnMessage = (e: any) => {
    const messageFromBuffer = e.data.toString();
    const parsedMessage = JSON.parse(messageFromBuffer);

    const { chatId, userId: chatUserId, message, createdAt } = parsedMessage;

    if (!chatId || !chatUserId || !message || !createdAt) return;

    const messageFromChatUsers =
      chatUserId === partnerId || chatUserId === userId;

    if (!messageFromChatUsers) return;

    setChatMessages((messages) => [
      ...messages,
      {
        chatId: chatId,
        userId: chatUserId,
        message: message,
        createdAt: new Date(createdAt),
      },
    ]);
  };

  useEffect(() => {
    socket.onopen = () => {
      console.log("opened ws connection");
    };

    socket.onmessage = (data) => {
      console.log("received message");
      handleOnMessage(data);
    };

    socket.onclose = (e) => {
      console.log("close ws connection: ", e.code, e.reason);
    };
  }, [socket]);

  return (
    <>
      <div className="message-container">
        {chatMessages?.length && (
          <>
            {chatMessages?.map((message, index) => {
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
