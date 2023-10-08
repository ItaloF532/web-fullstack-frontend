import { AxiosError } from "axios";
import HttpService from "../services/http";

type GetChatDTO = {
  chatId: string;
  messages: {
    userId: string;
    message: string;
    createdAt: string;
  }[];
};

export type ChatDTO = {
  chatId: string;
  messages: {
    userId: string;
    message: string;
    createdAt: Date;
  }[];
};

class ChatMessageController {
  private http = new HttpService();

  async getChatMessages(chatId: string): Promise<ChatDTO | undefined> {
    try {
      const res = await this.http.getAuth<{ chat: GetChatDTO }>({
        path: `/chat/${chatId}/messages`,
      });

      const chat = res?.data?.chat;
      const messages = chat?.messages?.map((message) => ({
        ...message,
        createdAt: new Date(message.createdAt),
      }));

      messages?.sort((a, b) => {
        return a.createdAt.getTime() - b.createdAt.getTime();
      });

      return {
        chatId: chat?.chatId,
        messages,
      };
    } catch (err) {
      if (err instanceof AxiosError) {
        const data = err.response?.data as { message: string };
        if (data?.message === "Invalid token!") {
          throw new Error("Invalid token!");
        }
        if (data?.message === "Missing authentication token!") {
          throw new Error("Missing authentication token!");
        }
      }

      throw err;
    }
  }
}

export default ChatMessageController;
