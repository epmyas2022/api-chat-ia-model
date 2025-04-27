import { ModelService } from '@/model-ia/domain/services/model.service';
import { Injectable } from '@dependencies/injectable';
import { PrimitiveMessage } from '@/model-ia/domain/entities/message.entity';
import {
  PrimitiveResponse,
  ResponseModel,
} from '@/model-ia/domain/entities/response-model.entity';
import * as readline from 'readline';
import { Readable } from 'node:stream';
import { HttpClientModelService } from '@/shared/services/http-client-model.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChatExternalDuckService extends ModelService {
  constructor(private readonly httpClient: HttpClientModelService) {
    super();
  }
  async chat(
    messages: PrimitiveMessage[],
    model: string,
  ): Promise<PrimitiveResponse> {
    const response = await this.httpClient.post('v1/chat', {
      messages,
      model,
    });

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
          }).toValue(),
        );
      });
    });
  }
}
