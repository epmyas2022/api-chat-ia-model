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
      responseType: 'stream',
      headers: {
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

        console.log('headers request', error.config?.headers);
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
}
