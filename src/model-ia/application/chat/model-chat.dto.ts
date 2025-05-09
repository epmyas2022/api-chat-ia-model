export class ModelChatDto {
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
  cursor?: string;
}
