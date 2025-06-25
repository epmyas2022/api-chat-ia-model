export class ModelChatDto {
  model: string;
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
  cursor?: string;
}
