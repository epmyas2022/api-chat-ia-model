export class ContextStandardDriver {
  message: string;
}

export class ContextExternalDriver {
  headers?: Record<string, string>;
  endpoint: string;
  jsonPath: string;
  query?: Record<string, string>;
}

export class ContextApiDto {
  driver: 'standard' | 'external';
  context?: ContextStandardDriver;
  external?: ContextExternalDriver;
}
