import { PrimitiveFingerprint } from '@/model-ia/domain/entities/fingerprint.entity';
import { PrimitiveMessage } from '@/model-ia/domain/entities/message.entity';
import {
  PrimitiveResponse,
  ResponseModel,
} from '@/model-ia/domain/entities/response-model.entity';
import { ModelService } from '@/model-ia/domain/services/model.service';
import { Injectable } from '@/shared/dependencies/injectable';
import { PrimitiveHttpResponse } from '@/shared/domain/entities/response.entity';
import { HttpClientService } from '@/shared/domain/services/http-client.service';
import { v4 as uuidv4 } from 'uuid';

interface OllamaResponse {
  message: {
    content: string;
  };
  created_at: string;
}
@Injectable()
export class ChatOllamaService extends ModelService {
  constructor(private readonly httpClient: HttpClientService) {
    super();
  }
  async chat(
    messages: PrimitiveMessage[],
    model: string,
    fingerprint: PrimitiveFingerprint,
  ): Promise<PrimitiveResponse> {
    const response: PrimitiveHttpResponse = await this.httpClient.post(
      '/api/chat',
      {
        messages,
        model,
        stream: false,
      },
    );

    const data = response.data as OllamaResponse;

    console.log('Ollama response:', data);

    return Promise.resolve(
      ResponseModel.create({
        action: 'chat',
        message: data.message.content,
        id: uuidv4(),
        model: model,
        fingerprint: fingerprint,
        created: new Date(data.created_at),
      }).toValue(),
    );
  }
}
