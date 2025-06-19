import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  MODEL_BASE_PATH,
  MODEL_MINI_ROUTE_V1,
  MODEL_MINI_O4_ROUTE_V1,
  MODEL_LLAMA_TURBO_ROUTE_V1,
  MODEL_CLAUDE_ROUTE_V1,
  MODEL_MISTRAL_SMALL_ROUTE_V1,
  ABOUT_ME_ROUTE,
} from '@/model-ia/infrastructure/routes/chat.route';
import {
  ContextDto,
  ContextExternalDto,
  ModelMiniHttpDto,
} from './model-mini-http.dto';
import { ModelChatUseCase } from '../../../../application/chat/model-chat-use-case';
import { ModelIA } from '../../../enum/model.enum';
import { HttpExceptionFilter } from '@/model-ia/infrastructure/filters/http-exception.filter';
import {
  promptAboutMe,
  contextProvider,
} from '@/model-ia/infrastructure/prompts/prompt';
import { CursorResponse } from '../../../responses/cursor.response';
import { ContextDriver } from '@/model-ia/domain/drivers/context.driver';
import { HttpClientService } from '@/shared/domain/services/http-client.service';
import { ContextApi } from './model-mini-http.dto';

@Controller(MODEL_BASE_PATH)
@UseFilters(new HttpExceptionFilter())
export class ModelMiniController {
  constructor(
    private readonly modelChatUseCase: ModelChatUseCase,
    private readonly context: ContextDriver<ContextDto | ContextExternalDto>,
    private readonly httpClient: HttpClientService,
  ) {}

  private async getContextMessage(contextApi?: ContextApi) {
    if (!contextApi) return;
    return contextProvider(this.context, contextApi, this.httpClient);
  }

  private async responseOfModel(
    modelChatMiniHttpDto: ModelMiniHttpDto,
    model: ModelIA,
    prompt?: { role: 'user' | 'assistant'; content: string },
  ): Promise<CursorResponse> {
    const { message, cursor: cursorInput, contextApi } = modelChatMiniHttpDto;

    const { response, cursor } = await this.modelChatUseCase.execute(
      {
        cursor: cursorInput,
        messages: [
          ...(prompt && (!cursorInput || contextApi) ? [prompt] : []),
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

  @Post(MODEL_MINI_ROUTE_V1)
  async chatGptMiniO3(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const prompt = await this.getContextMessage(
      chatModelMiniHttpDto.contextApi,
    );
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.GPT_MINI,
      prompt,
    );
    return response.json();
  }

  @Post(MODEL_MINI_O4_ROUTE_V1)
  async chatGptMiniO4(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const prompt = await this.getContextMessage(
      chatModelMiniHttpDto.contextApi,
    );
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.GPT_MINI_O4,
      prompt,
    );
    return response.json();
  }

  @Post(MODEL_LLAMA_TURBO_ROUTE_V1)
  async chatLlamaTurbo(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const prompt = await this.getContextMessage(
      chatModelMiniHttpDto.contextApi,
    );
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.LLAMA_TURBO,
      prompt,
    );
    return response.json();
  }

  @Post(MODEL_CLAUDE_ROUTE_V1)
  async chatClaude(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const prompt = await this.getContextMessage(
      chatModelMiniHttpDto.contextApi,
    );
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.CLAUDE,
      prompt,
    );
    return response.json();
  }
  @Post(MODEL_MISTRAL_SMALL_ROUTE_V1)
  async chatMistralSmall(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const prompt = await this.getContextMessage(
      chatModelMiniHttpDto.contextApi,
    );
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      ModelIA.MISTRAL_SMALL,
      prompt,
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
