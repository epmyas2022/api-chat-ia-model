export class PrimitiveMessage {
  role: string;
  content: string;
  hidden?: boolean;
}

export type RoleType = 'user' | 'assistant' | 'system';
export class Message {
  private constructor(private readonly attributes: PrimitiveMessage) {}

  /** FACTORY METHOD */
  static create(attributes: {
    role: RoleType;
    content: string;
    hidden?: boolean;
  }): Message {
    return new Message(attributes);
  }

  toValue(): PrimitiveMessage {
    return this.attributes;
  }

  toObject() {
    return { ...this.attributes };
  }
}
