import { Module } from '@nestjs/common';
import { ChatExternalDuckService } from './infrastructure/services/chat-external-duck.service';
import { ModelService } from './domain/services/model.service';
import { ModelChatUseCase } from './application/chat/model-chat-use-case';
import { ModelMiniController } from './infrastructure/api/chat/v1/model-mini.controller';
import { HttpClientModelService } from '@/shared/services/http-client-model.service';

@Module({
  imports: [],
  controllers: [ModelMiniController],
  providers: [
    HttpClientModelService,
    ModelChatUseCase,
    {
      provide: ModelService,
      useClass: ChatExternalDuckService,
    },
  ],
})
export class ModelIAModule {}
