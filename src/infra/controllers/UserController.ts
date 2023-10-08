import { AxiosError } from "axios";
import HttpService from "../services/http";

export type UserDTO = {
  id: string;
  username: string;
  profileImage: string;
};

class UserController {
  private http = new HttpService();

  async getUser(): Promise<UserDTO | undefined> {
    try {
      const res = await this.http.getAuth<{ user: UserDTO }>({
        path: "/user",
      });

      return res?.data?.user;
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

export default UserController;
