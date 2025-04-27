import { PrimitiveMessage } from '@/model-ia/domain/entities/message.entity';
import { PrimitiveResponse } from '@/model-ia/domain/entities/response-model.entity';
export abstract class ModelService {
  abstract chat(
    messages: PrimitiveMessage[],
    model: string,
  ): Promise<PrimitiveResponse>;
}
