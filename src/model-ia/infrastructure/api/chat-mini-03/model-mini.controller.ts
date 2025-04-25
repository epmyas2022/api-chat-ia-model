import { Body, Controller, Post } from '@nestjs/common';
import {
  MODEL_BASE_PATH,
  MODEL_MINI_03_ROUTE,
} from '@/model-ia/infrastructure/routes/chat.route';
import { ModelMiniHttpDto } from './model-mini-http.dto';
import { ModelChatUseCase } from '../../../application/chat/model-chat-use-case';

@Controller(MODEL_BASE_PATH)
export class ModelMiniController {
  constructor(private readonly modelChatUseCase: ModelChatUseCase) {}

  @Post(MODEL_MINI_03_ROUTE)
  async chat(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    return await this.modelChatUseCase.execute(chatModelMiniHttpDto);
  }
}
