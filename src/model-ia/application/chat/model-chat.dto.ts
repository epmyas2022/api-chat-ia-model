export class ContextApiDto {
  driver: 'standard' | 'external';
  context?: {
    message: string;
  };
  external?: {
    headers?: Record<string, string>;
    endpoint: string;
    jsonPath: string;
    query?: Record<string, string>;
  };
}

export class ModelChatDto {
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
  cursor?: string;
  contextApi?: ContextApiDto;
}
