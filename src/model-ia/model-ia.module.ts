import { Module } from '@nestjs/common';
import { ChatExternalDuckService } from './infrastructure/services/chat-external-duck.service';
import { ModelService } from './domain/services/model.service';
import { ModelChatUseCase } from './application/chat/model-chat-use-case';
import { ModelMiniController } from './infrastructure/api/chat/v1/model-mini.controller';
import { HttpClientModelService } from '@/shared/services/http-client-model.service';
import { HttpClientService } from '@/shared/domain/services/http-client.service';
import { GetApiKeyService } from './domain/services/get-api-key.service';
import { GetExternalDuckVqdService } from './infrastructure/services/get-external-duck-vqd.service';

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
    {
      provide: HttpClientService,
      useClass: HttpClientModelService,
    },
    {
      provide: GetApiKeyService,
      useClass: GetExternalDuckVqdService,
    },
  ],
})
export class ModelIAModule {}
