import {
  Fingerprint,
  PrimitiveFingerprint,
} from '@/model-ia/domain/entities/fingerprint.entity';
import { GetApiKeyService } from '@/model-ia/domain/services/get-api-key.service';
import { Injectable } from '@/shared/dependencies/injectable';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GetOllamaVqdService implements GetApiKeyService {
  async getApiKey(): Promise<PrimitiveFingerprint> {
    const fingerprint = Fingerprint.create({
      key: uuidv4(),
      userAgent: '',
    });

    return Promise.resolve(fingerprint.toValue());
  }
}
