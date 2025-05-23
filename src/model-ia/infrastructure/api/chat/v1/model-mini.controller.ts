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

  private async responseOfModel(
    modelChatMiniHttpDto: ModelMiniHttpDto,
    model: ModelIA,
    prompt?: { role: 'user' | 'assistant'; content: string },
  ): Promise<CursorResponse> {
    const { message, cursor: cursorInput } = modelChatMiniHttpDto;

    const { response, cursor } = await this.modelChatUseCase.execute(
      {
        cursor: cursorInput,
        messages: [
          ...(prompt && !cursorInput ? [prompt] : []),
          {
            role: 'user',
            content: message,
          },
        ],
      },
      model,
    );
    return new CursorResponse(response, cursor);
  }
  @Post(MODEL_MINI_O3_ROUTE_V1)
  async chatGptMiniO3(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.GPT_MINI_O3,
    );
    return response.json();
  }

  @Post(MODEL_MINI_O4_ROUTE_V1)
  async chatGptMiniO4(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.GPT_MINI_O4,
    );
    return response.json();
  }

  @Post(MODEL_LLAMA_TURBO_ROUTE_V1)
  async chatLlamaTurbo(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.LLAMA_TURBO,
    );
    return response.json();
  }

  @Post(MODEL_CLAUDE_ROUTE_V1)
  async chatClaude(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.CLAUDE,
    );
    return response.json();
  }
  @Post(MODEL_MISTRAL_SMALL_ROUTE_V1)
  async chatMistralSmall(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.MISTRAL_SMALL,
    );
    return response.json();
  }

  @Post(ABOUT_ME_ROUTE)
  async chatAboutMe(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.GPT_MINI_O4,
      promptAboutMe(),
    );
    return response.json();
  }
}
