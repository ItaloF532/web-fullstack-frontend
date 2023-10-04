import { AxiosError } from "axios";
import HttpService from "../services/http";
import Cookies from "js-cookie";

export type ListUserChatsDTO = {
  id: string;
  createdAt: string;
  updatedAt: string;
  users: {
    id: string;
    username: string;
    profileImage: string;
  }[];
}[];

class ChatController {
  private http = new HttpService();

  async listUserChats(): Promise<ListUserChatsDTO> {
    try {
      const res = await this.http.getAuth<{ chats: ListUserChatsDTO }>({
        path: "/get-user-chats",
      });

      return res?.data?.chats ?? [];
    } catch (err) {
      if (err instanceof AxiosError) {
        const data = err.response?.data as { message: string };
        if (data?.message === "Invalid credentials!") {
          throw new Error("Invalid credentials!");
        }
      }

      throw err;
    }
  }
}

export default ChatController;
