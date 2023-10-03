import axios, { AxiosInstance, AxiosResponse } from "axios";

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

  async get<T>({ path = "", params }: HttpParams): Promise<AxiosResponse<T>> {
    const res = await this.client.get<T>(path, {
      params,
    });

    return res;
  }
}

export default HttpService;
