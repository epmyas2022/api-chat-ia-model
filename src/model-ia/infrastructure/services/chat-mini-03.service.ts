import { ModelService } from '@/model-ia/domain/services/model.service';
import { Injectable } from '@dependencies/injectable';
import { PrimitiveMessage } from '@/model-ia/domain/entities/message.entity';
import { ResponseModel } from '@/model-ia/domain/entities/response-model.entity';
import * as readline from 'readline';
import axios from 'axios';
import { Readable } from 'node:stream';

@Injectable()
export class ChatMini03Service extends ModelService {
  async chat(messages: PrimitiveMessage[]): Promise<ResponseModel> {
    const response = await axios('https://duckduckgo.com/duckchat/v1/chat', {
      responseType: 'stream',
      headers: {
        'X-Vqd-4': '1-39317742399392818808170431571047827828',
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
      },
      method: 'POST',
      data: JSON.stringify({ messages, model: 'o3-mini' }),
    });

    let modelResponse = '';

    const rl = readline.createInterface({
      input: response.data as Readable,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      modelResponse += line;
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
