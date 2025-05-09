export class PrimitiveFingerprint {
  key: string;
  userAgent: string;
}

export class Fingerprint {
  private constructor(private readonly attributes: PrimitiveFingerprint) {}

  static create(attributes: { key: string; userAgent: string }): Fingerprint {
    return new Fingerprint(attributes);
  }

  toValue(): PrimitiveFingerprint {
    return this.attributes;
  }

  toObject() {
    return { ...this.attributes };
  }
}
