import { PrimitiveFingerprint } from '../entities/fingerprint.entity';

export abstract class GetApiKeyService {
  abstract getApiKey(): Promise<PrimitiveFingerprint>;
}
