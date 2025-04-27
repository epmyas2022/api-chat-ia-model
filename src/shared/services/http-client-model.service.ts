import { ConfigService } from '@nestjs/config';
import { Injectable } from '../dependencies/injectable';
import { EnvironmentVariable } from '../environment/env.variables';
import axios, { AxiosError, AxiosInstance } from 'axios';
import * as readline from 'readline';
import { Readable } from 'node:stream';
import { ExternalModelException } from '@/model-ia/infrastructure/exceptions/external-model.exception';
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
        'X-Vqd-4': this.configService.get<string>('EXTERNAL_CHAT_X_VQD_4'),
        'Content-Type': 'application/json',
        'User-Agent': this.configService.get<string>(
          'EXTERNAL_CHAT_USER_AGENT',
        ),
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        //Respuesta del servidor
        let responseStream = '';
        const rl = readline.createInterface({
          input: error.response?.data as Readable,
          crlfDelay: Infinity,
        });
        rl.on('line', (line) => {
          responseStream += line;
        });
        return new Promise((_resolve, reject) => {
          rl.on('close', () => {
            reject(
              new ExternalModelException(
                `Error in HTTP Client: ${error.message} - ${responseStream}`,
              ),
            );
          });
        });
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
