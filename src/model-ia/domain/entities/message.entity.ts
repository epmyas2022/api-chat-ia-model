export class PrimitiveMessage {
  role: string;
  content: string;
}

export class Message {
  private constructor(private readonly attributes: PrimitiveMessage) {}

  /** FACTORY METHOD */
  static create(attributes: { role: string; content: string }): Message {
    return new Message(attributes);
  }

  toValue(): PrimitiveMessage {
    return this.attributes;
  }

  toObject() {
    return { ...this.attributes };
  }
}
