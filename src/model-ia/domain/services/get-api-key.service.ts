export abstract class GetApiKeyService {
  abstract getApiKey(): Promise<string>;
}
