import { PrimitiveResponse } from '@/model-ia/domain/entities/response-model.entity';

export class CursorResponse {
  constructor(
    private readonly chat: PrimitiveResponse,
    private readonly cursor: string,
  ) {}

  json() {
    return {
      chat: {
        id: this.chat.id,
        model: this.chat.model,
        message: this.chat.message,
        created: this.chat.created,
        action: this.chat.action,
      },
      cursor: this.cursor,
    };
  }
}
