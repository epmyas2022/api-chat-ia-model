import { PrimitiveMessage } from '../entities/message.entity';

export class ChatCursor {
  constructor(
    private readonly messages: PrimitiveMessage[],
    private readonly key: string,
  ) {}

  toBase64(): string {
    const json = JSON.stringify({
      key: this.key,
      messages: this.messages.filter((message) => !message.hidden),
    });

    return Buffer.from(json, 'utf-8').toString('base64');
  }
  static fromBase64(
    base64: string,
    newMessages?: PrimitiveMessage[],
  ): ChatCursor {
    const json = Buffer.from(base64, 'base64').toString('utf-8');
    const { key, messages } = JSON.parse(json) as {
      key: string;
      messages: PrimitiveMessage[];
    };

    if (newMessages) {
      messages.push(...newMessages);
    }
    return new ChatCursor(messages, key);
  }

  get Key(): string {
    return this.key;
  }
  get Messages(): PrimitiveMessage[] {
    return this.messages;
  }
}
