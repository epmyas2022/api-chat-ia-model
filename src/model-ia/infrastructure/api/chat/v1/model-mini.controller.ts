import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  MODEL_BASE_PATH,
  MODEL_MINI_O3_ROUTE_V1,
  MODEL_MINI_O4_ROUTE_V1,
  MODEL_LLAMA_TURBO_ROUTE_V1,
  MODEL_CLAUDE_ROUTE_V1,
  MODEL_MISTRAL_SMALL_ROUTE_V1,
} from '@/model-ia/infrastructure/routes/chat.route';
import { ModelMiniHttpDto } from './model-mini-http.dto';
import { ModelChatUseCase } from '../../../../application/chat/model-chat-use-case';
import { ModelIA } from '../../../enum/model.enum';
import { HttpExceptionFilter } from '@/model-ia/infrastructure/filters/http-exception.filter';

@Controller(MODEL_BASE_PATH)
@UseFilters(new HttpExceptionFilter())
export class ModelMiniController {
  constructor(private readonly modelChatUseCase: ModelChatUseCase) {}

  @Post(MODEL_MINI_O3_ROUTE_V1)
  async chatGptMiniO3(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    return await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.GPT_MINI_O3,
    );
  }

  @Post(MODEL_MINI_O4_ROUTE_V1)
  async chatGptMiniO4(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    return await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.GPT_MINI_O4,
    );
  }

  @Post(MODEL_LLAMA_TURBO_ROUTE_V1)
  async chatLlamaTurbo(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    return await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.LLAMA_TURBO,
    );
  }

  @Post(MODEL_CLAUDE_ROUTE_V1)
  async chatClaude(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    return await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.CLAUDE,
    );
  }
  @Post(MODEL_MISTRAL_SMALL_ROUTE_V1)
  async chatMistralSmall(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    return await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.MISTRAL_SMALL,
    );
  }
}
