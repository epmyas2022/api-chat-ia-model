import { Message } from '@/model-ia/domain/entities/message.entity';
import { ModelService } from '../../domain/services/model.service';
import { ModelChatDto } from './model-chat.dto';
import { ResponseModel } from '@/model-ia/domain/entities/response-model.entity';
import { Injectable } from '@dependencies/injectable';

@Injectable()
export class ModelChatUseCase {
  constructor(private readonly modelService: ModelService) {}

  async execute(modelChat: ModelChatDto): Promise<ResponseModel> {
    const { messages } = modelChat;

    const messagesEntity = messages.map((message) => {
      const { role, content } = message;
      return Message.create({ role, content }).toValue();
    });

    console.log(messagesEntity);

    return await this.modelService.chat(messagesEntity);
  }
}
