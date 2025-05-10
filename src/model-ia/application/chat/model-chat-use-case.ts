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
import { EncryptService } from '@/model-ia/domain/services/encrypt.service';

@Injectable()
export class ModelChatUseCase {
  constructor(
    private readonly modelService: ModelService,
    private readonly getApiKeyService: GetApiKeyService,
    private readonly encryptService: EncryptService,
  ) {}

  private async getCursorDefault(
    messages: PrimitiveMessage[],
  ): Promise<ChatCursor> {
    const fingerprint = await this.getApiKeyService.getApiKey();
    return new ChatCursor(messages, fingerprint);
  }

  private async getCursor(
    messages: PrimitiveMessage[],
    cursorInput: string,
  ): Promise<ChatCursor> {
    const decode = await this.encryptService.decode(cursorInput);
    const cursor = ChatCursor.fromBase64(decode, messages);
    return cursor;
  }
  async execute(
    modelChat: ModelChatDto,
    model: string,
  ): Promise<{ response: PrimitiveResponse; cursor: string }> {
    const { messages, cursor: cursorInput } = modelChat;

    const messagesEntity = messages.map((message) => {
      const { role, content } = message;
      return Message.create({ role, content }).toValue();
    });

    const cursor = cursorInput
      ? await this.getCursor(messagesEntity, cursorInput)
      : await this.getCursorDefault(messagesEntity);

    const response = await this.modelService.chat(
      cursor.Messages,
      model,
      cursor.Fingerprint,
    );

    const messageAssistant = Message.create({
      role: 'assistant',
      content: response.message,
    }).toValue();

    cursor.Messages.push(messageAssistant);

    const nextCursor = new ChatCursor(cursor.Messages, response.fingerprint);

    const encodeCursor = await this.encryptService.encode(
      nextCursor.toBase64(),
    );
    return { response: response, cursor: encodeCursor };
  }
}
