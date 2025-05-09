import {
  Message,
  PrimitiveMessage,
} from '@/model-ia/domain/entities/message.entity';
import { ModelService } from '../../domain/services/model.service';
import { ModelChatDto } from './model-chat.dto';
import { PrimitiveResponse } from '@/model-ia/domain/entities/response-model.entity';
import { Injectable } from '@dependencies/injectable';
import { ChatCursor } from '@/model-ia/domain/cursors/chat.cursor';
import { GetApiKeyService } from '@/model-ia/domain/services/get-api-key.service';

@Injectable()
export class ModelChatUseCase {
  constructor(
    private readonly modelService: ModelService,
    private readonly getApiKeyService: GetApiKeyService,
  ) {}

  private async getCursorDefault(
    messages: PrimitiveMessage[],
  ): Promise<ChatCursor> {
    const apiKey = await this.getApiKeyService.getApiKey();
    return new ChatCursor(messages, apiKey);
  }
  async execute(
    modelChat: ModelChatDto,
    model: string,
    cursorInput?: string,
  ): Promise<{ response: PrimitiveResponse; cursor: ChatCursor }> {
    const { messages } = modelChat;

    const messagesEntity = messages.map((message) => {
      const { role, content } = message;
      return Message.create({ role, content }).toValue();
    });

    const cursor = cursorInput
      ? ChatCursor.fromBase64(cursorInput, messagesEntity)
      : await this.getCursorDefault(messagesEntity);

    const response = await this.modelService.chat(
      messagesEntity,
      model,
      cursor.Key,
    );

    const messageAssistant = Message.create({
      role: 'assistant',
      content: response.message,
    }).toValue();

    messagesEntity.push(messageAssistant);

    const nextCursor = new ChatCursor(messagesEntity, response.key);

    return { response: response, cursor: nextCursor };
  }
}
