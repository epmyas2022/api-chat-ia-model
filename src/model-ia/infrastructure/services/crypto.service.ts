import { EncryptService } from '@/model-ia/domain/services/encrypt.service';
import { Injectable } from '@/shared/dependencies/injectable';
import { EnvironmentVariable } from '@/shared/environment/env.variables';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService extends EncryptService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly iv = crypto.randomBytes(16);
  private readonly secretKey: Buffer;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariable>,
  ) {
    super();
    this.secretKey = Buffer.from(
      this.configService.get<string>('SECRET_KEY')!,
      'hex',
    );
  }
  encode(text: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.secretKey,
      this.iv,
    );

    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return `${this.iv.toString('base64')}#${encrypted}`;
  }

  decode(text: string): string {
    const [ivBase64, encrypted] = text.split('#');
    const iv = Buffer.from(ivBase64, 'base64');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      iv,
    );
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    if (decrypted === 'Invalid key') {
      throw new Error('Invalid key or corrupted data');
    }
    return decrypted;
  }
}
