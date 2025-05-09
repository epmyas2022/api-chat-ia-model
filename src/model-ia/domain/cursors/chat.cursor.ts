import { PrimitiveMessage } from '../entities/message.entity';
import {
  Fingerprint,
  PrimitiveFingerprint,
} from '../entities/fingerprint.entity';

export class ChatCursor {
  constructor(
    private readonly messages: PrimitiveMessage[],
    private readonly fingerprint: PrimitiveFingerprint,
  ) {}

  toBase64(): string {
    const json = JSON.stringify({
      key: this.fingerprint.key,
      userAgent: this.fingerprint.userAgent,
      messages: this.messages.filter((message) => !message.hidden),
    });

    return Buffer.from(json, 'utf-8').toString('base64');
  }
  static fromBase64(
    base64: string,
    newMessages?: PrimitiveMessage[],
  ): ChatCursor {
    const json = Buffer.from(base64, 'base64').toString('utf-8');

    const { key, userAgent, messages } = JSON.parse(json) as {
      key: string;
      userAgent: string;
      messages: PrimitiveMessage[];
    };

    if (newMessages) {
      messages.push(...newMessages);
    }
    const fingerprint = Fingerprint.create({
      key,
      userAgent,
    });
    return new ChatCursor(messages, fingerprint.toValue());
  }

  get Fingerprint(): PrimitiveFingerprint {
    return this.fingerprint;
  }
  get Messages(): PrimitiveMessage[] {
    return this.messages;
  }
}
