import "./style.css";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { WS_API_URL } from "../../constants";

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

export type ChatMessagePageProps = {
  userId: string;
};

const ChatMessagePage: React.FC<ChatMessagePageProps> = ({ userId }) => {
  const { chatId } = useParams();

  const [chat, setChat] = React.useState<ChatMessageDTO>();
  const [isConnectionOpen, setConnectionOpen] = React.useState(false);
  const [messageBody, setMessageBody] = React.useState("");

  const { username } = useParams();

  const ws = useRef<any>();

  const sendMessage = () => {
    if (messageBody && ws?.current) {
      ws.current.send(
        JSON.stringify({
          sender: username,
          body: messageBody,
        })
      );
      setMessageBody("");
    }
  };

  useEffect(() => {
    ws.current = new WebSocket(WS_API_URL);

    ws.current.onopen = () => {
      console.log("Connection opened");
      setConnectionOpen(true);
    };

    ws.current.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      setChat({
        ...chat,
        messages: [...(chat?.messages ?? []), data],
      });
    };

    return () => {
      console.log("Cleaning up...");
      ws.current.close();
    };
  }, []);

  const scrollTarget = useRef<any>(null);

  useEffect(() => {
    if (scrollTarget?.current) {
      scrollTarget?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages?.length]);

  return (
    // <>
    //   <div className="chat-list-container">
    //     <div className="chat-list">
    //       <h2>User Chat Message</h2>
    //     </div>
    //   </div>
    // </>
    <>
      <div id="chat-view-container" className="flex flex-col w-1/3">
        {chat?.messages?.map((message, index) => (
          <div
            key={index}
            className={`my-3 rounded py-3 w-1/3 text-white ${
              message.userId === userId
                ? "self-end bg-purple-600"
                : "bg-blue-600"
            }`}
          >
            <div className="flex items-center">
              <div className="ml-2">
                <div className="flex flex-row">
                  <div className="text-sm font-medium leading-5 text-gray-900">
                    {message.userId} at
                  </div>
                  <div className="ml-1">
                    <div className="text-sm font-bold leading-5 text-gray-900">
                      {new Date(message.createdAt).toLocaleTimeString(
                        undefined,
                        {
                          timeStyle: "short",
                        }
                      )}{" "}
                    </div>
                  </div>
                </div>
                <div className="mt-1 text-sm font-semibold leading-5">
                  {message.message}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollTarget} />
      </div>
      <footer className="w-1/3">
        <p>
          You are chatting as <span className="font-bold">{username}</span>
        </p>

        <div className="flex flex-row">
          <input
            id="message"
            type="text"
            className="w-full border-2 border-gray-200 focus:outline-none rounded-md p-2 hover:border-purple-400"
            placeholder="Type your message here..."
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            required
          />
          <button
            aria-label="Send"
            onClick={sendMessage}
            className="m-3"
            disabled={!isConnectionOpen}
          >
            Send
          </button>
        </div>
      </footer>
    </>
  );
};

export default ChatMessagePage;
