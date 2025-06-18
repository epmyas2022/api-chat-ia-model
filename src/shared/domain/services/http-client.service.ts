import { Injectable } from '@/shared/dependencies/injectable';
import { PrimitiveHttpResponse } from '../entities/response.entity';

@Injectable()
export abstract class HttpClientService {
  abstract post(
    url: string,
    data?: Record<string, unknown>,
    options?: object,
  ): Promise<PrimitiveHttpResponse>;

  abstract get(url: string, options?: object): Promise<PrimitiveHttpResponse>;
}
