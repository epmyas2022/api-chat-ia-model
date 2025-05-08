import { ChatCursor } from '@/model-ia/domain/cursors/chat.cursor';

export class CursorResponse {
  constructor(
    private readonly chat: unknown,
    private readonly cursor: ChatCursor,
  ) {}

  json() {
    return {
      chat: this.chat,
      cursor: this.cursor.toBase64(),
    };
  }
}
