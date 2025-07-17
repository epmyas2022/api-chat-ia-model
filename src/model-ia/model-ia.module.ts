import { Module } from '@nestjs/common';
import { ModelService } from './domain/services/model.service';
import { ModelChatUseCase } from './application/chat/model-chat-use-case';
import { ModelMiniController } from './infrastructure/api/chat/v1/model-mini.controller';
import { HttpClientModelService } from '@/shared/services/http-client-model.service';
import { HttpClientService } from '@/shared/domain/services/http-client.service';
import { GetApiKeyService } from './domain/services/get-api-key.service';
import { EncryptService } from './domain/services/encrypt.service';
import { CryptoService } from './infrastructure/services/crypto.service';
import { ContextDriver } from './domain/drivers/context.driver';
import { ChatOllamaService } from './infrastructure/services/chat-ollama.service';
import { GetOllamaVqdService } from './infrastructure/services/get-ollama-vqd.service';

@Module({
  imports: [],
  controllers: [ModelMiniController],
  providers: [
    HttpClientModelService,
    ContextDriver,
    ModelChatUseCase,
    {
      provide: ModelService,
      //useClass: ChatExternalDuckService  (commented out to use ChatOllamaService),
      useClass: ChatOllamaService,
    },
    {
      provide: HttpClientService,
      useClass: HttpClientModelService,
    },
    {
      provide: GetApiKeyService,
      //useClass: GetExternalDuckVqdService,
      useClass: GetOllamaVqdService,
    },

    {
      provide: EncryptService,
      useClass: CryptoService,
    },
  ],
})
export class ModelIAModule {}
