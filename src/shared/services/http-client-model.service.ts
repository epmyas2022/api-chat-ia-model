import { ConfigService } from '@nestjs/config';
import { Injectable } from '../dependencies/injectable';
import { EnvironmentVariable } from '../environment/env.variables';
import axios, { AxiosError, AxiosInstance } from 'axios';
import * as readline from 'readline';
import { Readable } from 'node:stream';
import { ExternalModelException } from '@/model-ia/infrastructure/exceptions/external-model.exception';
import { HttpClientService } from '../domain/services/http-client.service';
import { PrimitiveHttpResponse } from '../domain/entities/response.entity';
@Injectable()
export class HttpClientModelService extends HttpClientService {
  private readonly instance: AxiosInstance;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariable>,
  ) {
    super();

    this.instance = axios.create({
      baseURL: this.configService.get<string>('EXTERNAL_CHAT_IA_URL'),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (this.instance.defaults.responseType !== 'stream') {
          return Promise.reject(
            new ExternalModelException(
              `Error in HTTP Client: ${error.message}`,
            ),
          );
        }
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

  async post(
    url: string,
    data?: Record<string, unknown>,
    params = {},
  ): Promise<PrimitiveHttpResponse> {
    const response = await this.instance.post<Response>(url, data, {
      ...params,
    });
    return { data: response.data, headers: response.headers };
  }

  async get(url: string, options?: object): Promise<PrimitiveHttpResponse> {
    const response = await this.instance.get<Response>(url, {
      ...options,
    });
    return { data: response.data, headers: response.headers };
  }
}
