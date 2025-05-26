export class PrimitiveFingerprint {
  key: string;
  userAgent: string;
  createdAt: Date;
  expiredIn?: number;
}

export class Fingerprint {
  private constructor(private readonly attributes: PrimitiveFingerprint) {}

  static create(attributes: {
    key: string;
    userAgent: string;
    expiredIn?: number;
  }): Fingerprint {
    return new Fingerprint({
      key: attributes.key,
      userAgent: attributes.userAgent,
      createdAt: new Date(),
      expiredIn: attributes.expiredIn,
    });
  }

  get CreatedAt(): Date {
    return this.attributes.createdAt;
  }

  toValue(): PrimitiveFingerprint {
    return this.attributes;
  }

  toObject() {
    return { ...this.attributes };
  }

  isExpired(): boolean {
    if (!this.attributes.expiredIn) {
      return false;
    }
    const expirationTime = new Date(
      this.attributes.createdAt.getTime() +
        this.attributes.expiredIn * 60 * 1000,
    );
    return new Date() > expirationTime;
  }
}
