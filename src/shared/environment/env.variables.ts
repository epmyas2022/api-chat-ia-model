import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class EnvironmentVariable {
  @IsOptional()
  PORT?: string | number;

  @IsString()
  @IsOptional()
  HOST?: string;

  @IsString()
  EXTERNAL_CHAT_IA_URL: string;

  @IsString()
  @IsNotEmpty()
  EXTERNAL_API_KEY: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(32)
  SECRET_KEY: string;

  @IsOptional()
  FINGERPRINT_EXPIRATION_MINUTES?: number;
}
