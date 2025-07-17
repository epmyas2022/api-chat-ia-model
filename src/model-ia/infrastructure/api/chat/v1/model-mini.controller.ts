import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import {
  MODEL_BASE_PATH,
  ABOUT_ME_ROUTE,
  MODEL_ROUTE_V1,
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
import { RoleType } from '@/model-ia/domain/entities/message.entity';

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
    prompt?: { role: RoleType; content: string },
  ): Promise<CursorResponse> {
    const {
      message,
      cursor: cursorInput,
      model = ModelIA.LLAMA,
    } = modelChatMiniHttpDto;

    const { response, cursor } = await this.modelChatUseCase.execute({
      model: model,
      cursor: cursorInput,
      messages: [
        ...(prompt && !cursorInput ? [prompt] : []),
        {
          role: 'user',
          content: message,
        },
      ],
    });
    return new CursorResponse(response, cursor);
  }

  @Post(MODEL_ROUTE_V1)
  async chat(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const response = await this.responseOfModel(chatModelMiniHttpDto);
    return response.json();
  }

  @Post(ABOUT_ME_ROUTE)
  async chatAboutMe(@Body() chatModelMiniHttpDto: ModelMiniHttpDto) {
    const response = await this.responseOfModel(
      chatModelMiniHttpDto,
      promptAboutMe(),
    );
    return response.json();
  }
}
