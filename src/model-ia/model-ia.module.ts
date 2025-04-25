import { Module } from '@nestjs/common';
import { ChatMini03Service } from './infrastructure/services/chat-mini-03.service';
import { ModelService } from './domain/services/model.service';
import { ModelChatUseCase } from './application/chat/model-chat-use-case';
import { ModelMiniController } from './infrastructure/api/chat-mini-03/model-mini.controller';
@Module({
  imports: [],
  controllers: [ModelMiniController],
  providers: [
    ModelChatUseCase,
    {
      provide: ModelService,
      useClass: ChatMini03Service,
    },
  ],
})
export class ModelIAModule {}
