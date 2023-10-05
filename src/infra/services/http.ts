import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { HTTP_API_URL } from "../../constants";

export type HttpParams = {
  path?: string;
  body?: Object;
  params?: Object;
};

class HttpService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: HTTP_API_URL,
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

  async posAutht<T>({
    path = "",
    body,
    params,
  }: HttpParams): Promise<AxiosResponse<T>> {
    const token = Cookies.get("token");
    const res = await this.client.post<T>(path, body, {
      params,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res;
  }
}

export default HttpService;
