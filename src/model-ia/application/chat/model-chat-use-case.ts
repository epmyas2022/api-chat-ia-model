import { Message } from '@/model-ia/domain/entities/message.entity';
import { ModelService } from '../../domain/services/model.service';
import { ModelChatDto } from './model-chat.dto';
import { PrimitiveResponse } from '@/model-ia/domain/entities/response-model.entity';
import { Injectable } from '@dependencies/injectable';

@Injectable()
export class ModelChatUseCase {
  constructor(private readonly modelService: ModelService) {}

  async execute(
    modelChat: ModelChatDto,
    model: string,
  ): Promise<PrimitiveResponse> {
    const { messages } = modelChat;

    const messagesEntity = messages.map((message) => {
      const { role, content } = message;
      return Message.create({ role, content }).toValue();
    });
    return await this.modelService.chat(messagesEntity, model);
  }
}
