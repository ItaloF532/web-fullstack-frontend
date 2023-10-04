import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export type HttpParams = {
  path?: string;
  body?: Object;
  params?: Object;
};

class HttpService {
  private uri = "https://localhost:8080";
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: this.uri,
    });
  }

  async post<T>({
    path = "",
    body,
    params,
  }: HttpParams): Promise<AxiosResponse<T>> {
    const res = await this.client.post<T>(path, body, {
      params,
    });

    return res;
  }

  async getAuth<T>({
    path = "",
    params,
  }: HttpParams): Promise<AxiosResponse<T>> {
    const token = Cookies.get("token");
    const res = await this.client.get<T>(path, {
      params,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res;
  }
}

export default HttpService;
