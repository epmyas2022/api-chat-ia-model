export class PrimitiveResponse {
  id: string;
  message: string;
  action: string;
  model?: string;
  key: string;
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
    key: string;
  }): ResponseModel {
    return new ResponseModel(attributes);
  }

  toValue(): PrimitiveResponse {
    return this.attributes;
  }

  toObject() {
    return { ...this.attributes };
  }
}
