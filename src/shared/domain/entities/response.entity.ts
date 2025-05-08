export class PrimitiveHttpResponse {
  data: unknown;
  headers: Record<string, unknown>;
}

export class HttpResponse {
  private constructor(private readonly attributes: PrimitiveHttpResponse) {}

  static create(attributes: {
    data: unknown;
    headers: Record<string, unknown>;
  }): HttpResponse {
    return new HttpResponse(attributes);
  }

  toValue(): PrimitiveHttpResponse {
    return this.attributes;
  }

  toObject() {
    return { ...this.attributes };
  }
}
