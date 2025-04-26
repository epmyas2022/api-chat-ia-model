import { ConfigService } from '@nestjs/config';
import { Injectable } from '../dependencies/injectable';
import { EnvironmentVariable } from '../environment/env.variables';
import axios, { AxiosError, AxiosInstance } from 'axios';

@Injectable()
export class HttpClientModelService {
  private readonly instance: AxiosInstance;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariable>,
  ) {
    this.instance = axios.create({
      baseURL: this.configService.get<string>('EXTERNAL_CHAT_IA_URL'),
      responseType: 'stream',
      headers: {
        'x-vqd-4': this.configService.get<string>('EXTERNAL_CHAT_X_VQD_4'),
        'content-type': 'application/json',
        'user-agent': this.configService.get<string>(
          'EXTERNAL_CHAT_USER_AGENT',
        ),
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        console.log(response.data);
        return response;
      },
      (error: AxiosError) => {
        console.error(
          `Error in HTTP Client: ${error.message} - ${error.response?.statusText}`,
        );
        console.log(error.response?.headers);
      },
    );
  }

  async get<T>(url: string, params?: Record<string, unknown>) {
    return this.instance.get<T>(url, { params });
  }

  async post<T>(url: string, data?: Record<string, unknown>) {
    return await this.instance.post<T>(url, data);
  }

  async put<T>(url: string, data?: Record<string, unknown>) {
    return this.instance.put<T>(url, data);
  }

  async delete<T>(url: string, params?: Record<string, unknown>) {
    return this.instance.delete<T>(url, { params });
  }
}
