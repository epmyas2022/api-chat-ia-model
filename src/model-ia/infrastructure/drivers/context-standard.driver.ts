import { ContextOperation } from '@/model-ia/domain/drivers/context.driver';
import { ContextDto } from '../api/chat/v1/model-mini-http.dto';

export class ContextStandardDriver extends ContextOperation<ContextDto> {
  async execute(args: ContextDto): Promise<string> {
    return Promise.resolve(args.message);
  }
}
