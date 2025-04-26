import { ModelService } from '@/model-ia/domain/services/model.service';
import { Injectable } from '@dependencies/injectable';
import { PrimitiveMessage } from '@/model-ia/domain/entities/message.entity';
import { ResponseModel } from '@/model-ia/domain/entities/response-model.entity';
import * as readline from 'readline';
import { Readable } from 'node:stream';
import { HttpClientModelService } from '@/shared/services/http-client-model.service';
import { ExternalModelException } from '../exceptions/external-model.exception';

@Injectable()
export class ChatMini03Service extends ModelService {
  constructor(private readonly httpClient: HttpClientModelService) {
    super();
  }
  async chat(messages: PrimitiveMessage[]): Promise<ResponseModel> {
    const response = await this.httpClient.post('v1/chat', {
      messages,
      model: 'o3-mini',
    });

    if (response.status !== 200) {
      throw new ExternalModelException(response.statusText);
    }

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
      console.log(data);
      modelResponse += data?.message ?? '';
    });

    return new Promise((resolve) => {
      rl.on('close', () => {
        console.log(modelResponse);
        resolve(
          ResponseModel.create({
            id: '1',
            message: 'Response from ChatMini03',
            model: 'gpt-3.5-turbo',
            action: 'chat',
            created: new Date(),
          }),
        );
      });
    });
  }
}
