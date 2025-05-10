import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  MODEL_BASE_PATH,
  MODEL_MINI_O3_ROUTE_V1,
  MODEL_MINI_O4_ROUTE_V1,
  MODEL_LLAMA_TURBO_ROUTE_V1,
  MODEL_CLAUDE_ROUTE_V1,
  MODEL_MISTRAL_SMALL_ROUTE_V1,
  ABOUT_ME_ROUTE,
} from '@/model-ia/infrastructure/routes/chat.route';
import { ModelMiniHttpDto } from './model-mini-http.dto';
import { ModelChatUseCase } from '../../../../application/chat/model-chat-use-case';
import { ModelIA } from '../../../enum/model.enum';
import { HttpExceptionFilter } from '@/model-ia/infrastructure/filters/http-exception.filter';
import { promptAboutMe } from '@/model-ia/infrastructure/prompts/prompt';
import { CursorResponse } from '../../../responses/cursor.response';

@Controller(MODEL_BASE_PATH)
@UseFilters(new HttpExceptionFilter())
export class ModelMiniController {
  constructor(private readonly modelChatUseCase: ModelChatUseCase) {}

  @Post(MODEL_MINI_O3_ROUTE_V1)
  async chatGptMiniO3(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const { response, cursor } = await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.GPT_MINI_O3,
    );
    return new CursorResponse(response, cursor).json();
  }

  @Post(MODEL_MINI_O4_ROUTE_V1)
  async chatGptMiniO4(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const { cursor, response } = await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.GPT_MINI_O4,
    );
    return new CursorResponse(response, cursor).json();
  }

  @Post(MODEL_LLAMA_TURBO_ROUTE_V1)
  async chatLlamaTurbo(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const { response, cursor } = await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.LLAMA_TURBO,
    );
    return new CursorResponse(response, cursor).json();
  }

  @Post(MODEL_CLAUDE_ROUTE_V1)
  async chatClaude(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const { response, cursor } = await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.CLAUDE,
    );
    return new CursorResponse(response, cursor).json();
  }
  @Post(MODEL_MISTRAL_SMALL_ROUTE_V1)
  async chatMistralSmall(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const { cursor, response } = await this.modelChatUseCase.execute(
      chatModelMiniHttpDto,
      ModelIA.MISTRAL_SMALL,
    );

    return new CursorResponse(response, cursor).json();
  }

  @Post(ABOUT_ME_ROUTE)
  async chatAboutMe(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const modelChat = !chatModelMiniHttpDto.cursor
      ? promptAboutMe(chatModelMiniHttpDto)
      : chatModelMiniHttpDto;

    const { response, cursor } = await this.modelChatUseCase.execute(
      modelChat,
      ModelIA.GPT_MINI_O4,
    );
    return new CursorResponse(response, cursor).json();
  }
}
