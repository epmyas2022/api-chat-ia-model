import { PrimitiveFingerprint } from './fingerprint.entity';

export class PrimitiveResponse {
  id: string;
  message: string;
  action: string;
  model?: string;
  fingerprint: PrimitiveFingerprint;
  created: Date;
}

export class ResponseModel {
  private constructor(private readonly attributes: PrimitiveResponse) {}

  static create(attributes: {
    id: string;
    message: string;
    action: string;
    model?: string;
    created: Date;
    fingerprint: PrimitiveFingerprint;
  }): ResponseModel {
    return new ResponseModel(attributes);
  }

  toValue(): PrimitiveResponse {
    return this.attributes;
  }

  toObject() {
    return {
      id: this.attributes.id,
      message: this.attributes.message,
      action: this.attributes.action,
      model: this.attributes.model,
      created: this.attributes.created,
    };
  }
}
