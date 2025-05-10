import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class EnvironmentVariable {
  @IsString()
  @IsNumber()
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
}
