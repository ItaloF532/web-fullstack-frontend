import { AxiosError } from "axios";
import HttpService from "../services/http";
import Cookies from "js-cookie";

class AuthController {
  private http = new HttpService();

  private async setTokenCookie(token: string): Promise<void> {
    Cookies.set("token", token, { expires: 1 });
  }

  async signIn(username: string, password: string): Promise<void> {
    try {
      const res = await this.http.post<{ token: string }>({
        path: "/login",
        body: {
          username,
          password,
        },
      });

      if (res?.data?.token) this.setTokenCookie(res.data.token);
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

export default AuthController;
