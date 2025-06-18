import { ContextOperation } from '@/model-ia/domain/drivers/context.driver';
import { ContextExternalDto } from '../api/chat/v1/model-mini-http.dto';
import { HttpClientService } from '@/shared/domain/services/http-client.service';
import { JSONPath } from '@/shared/dependencies/jsonpath';
import { BadRequestException } from '@nestjs/common';

export class ContextExternalDriver extends ContextOperation<ContextExternalDto> {
  static instace: ContextExternalDriver;

  static getInstance(httpService: HttpClientService): ContextExternalDriver {
    if (!ContextExternalDriver.instace) {
      ContextExternalDriver.instace = new ContextExternalDriver(httpService);
    }
    return ContextExternalDriver.instace;
  }

  private constructor(private httpService: HttpClientService) {
    super();
  }

  async execute(args: ContextExternalDto): Promise<string> {
    const { endpoint, headers, jsonPath, query } = args;
    const response = await this.httpService.get(endpoint, {
      headers,
      params: query,
      responseType: 'json',
    });

    if (Array.isArray(response.data)) {
      throw new BadRequestException(
        `Se esperaba un 'objeto' en la respuesta del endpoint '${endpoint}', pero se obtuvo un 'array'.`,
      );
    }
    const data: [] = JSONPath({
      json: response.data as object,
      path: jsonPath,
    });

    const content = data.find((item) => typeof item === 'string');

    if (!content) {
      throw new BadRequestException(
        `Se espera un 'string' en la ruta JSON '${jsonPath}', pero se obtuvo: ${JSON.stringify(data)}`,
      );
    }
    return content;
  }
}
