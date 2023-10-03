import HttpService from "../services/http";

class AuthController {
  private http = new HttpService();

  async signIn(username: string, password: string): Promise<string> {
    try {
      const res = await this.http.post({
        path: "/login",
        body: {
          username,
          password,
        },
      });

      console.log(res);

      return "";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default AuthController;
