import { ContextDriver } from '@/model-ia/domain/drivers/context.driver';
import { Injectable } from '@/shared/dependencies/injectable';
import { ContextApiDto } from './context-api.dto';

@Injectable()
export class ModelChatContextUseCase {
  constructor(private readonly context: ContextDriver<ContextApiDto>) {}
  async execute(contextApi: ContextApiDto) {
    const result = await this.context.context(contextApi);
    return result;
  }
}
