export abstract class EncryptService {
  abstract encode(text: string): Promise<string> | string;
  abstract decode(text: string): Promise<string> | string;
}
