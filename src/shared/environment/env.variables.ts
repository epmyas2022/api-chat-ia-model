import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export type EnvironmentVariableType = {
  PORT?: string | number;
  HOST?: string;
  EXTERNAL_CHAT_IA_URL: string;
  EXTERNAL_CHAT_USER_AGENT?: string;
  EXTERNAL_CHAT_X_VQD_4: string;
};

export class EnvironmentVariable implements EnvironmentVariableType {
  @IsString()
  @IsOptional()
  EXTERNAL_CHAT_USER_AGENT?: string;

  @IsString()
  @MinLength(40)
  EXTERNAL_CHAT_X_VQD_4: string;

  @IsString()
  @IsNumber()
  @IsOptional()
  PORT?: string | number;

  @IsString()
  @IsOptional()
  HOST?: string;

  @IsString()
  EXTERNAL_CHAT_IA_URL: string;
}
