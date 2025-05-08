import { ModelService } from '@/model-ia/domain/services/model.service';
import { Injectable } from '@dependencies/injectable';
import { PrimitiveMessage } from '@/model-ia/domain/entities/message.entity';
import {
  PrimitiveResponse,
  ResponseModel,
} from '@/model-ia/domain/entities/response-model.entity';
import * as readline from 'readline';
import { Readable } from 'node:stream';
import { v4 as uuidv4 } from 'uuid';
import { HttpClientService } from '@/shared/domain/services/http-client.service';
import { PrimitiveHttpResponse } from '@/shared/domain/entities/response.entity';

@Injectable()
export class ChatExternalDuckService extends ModelService {
  constructor(private readonly httpClient: HttpClientService) {
    super();
  }
  async chat(
    messages: PrimitiveMessage[],
    model: string,
    key: string,
  ): Promise<PrimitiveResponse> {
    const response: PrimitiveHttpResponse = await this.httpClient.post(
      'v1/chat',
      {
        messages,
        model,
      },
      { headers: { 'X-Vqd-4': key } },
    );

    const XVQ4 = response.headers['x-vqd-4'] as string;

    console.log('new XVQ4', XVQ4);

    let modelResponse = '';

    const rl = readline.createInterface({
      input: response.data as Readable,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      if (line.startsWith('data: [DONE]')) {
        rl.close();
        return;
      }
      const jsonInput = line.replace('data:', '');
      const validJson = new RegExp(/\{.*?\}/);

      if (!validJson.test(jsonInput)) return;

      const data = JSON.parse(jsonInput) as {
        role?: string;
        message: string;
      };
      modelResponse += data?.message ?? '';
    });

    return new Promise((resolve) => {
      rl.on('close', () => {
        resolve(
          ResponseModel.create({
            id: uuidv4(),
            message: modelResponse,
            model: model,
            action: 'chat',
            created: new Date(),
            key: XVQ4,
          }).toValue(),
        );
      });
    });
  }
}
