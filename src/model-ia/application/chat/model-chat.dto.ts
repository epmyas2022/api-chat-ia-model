import { RoleType } from '@/model-ia/domain/entities/message.entity';

export class ModelChatDto {
  model: string;
  messages: {
    role: RoleType;
    content: string;
  }[];
  cursor?: string;
}
