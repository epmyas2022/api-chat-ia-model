import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export type EnvironmentVariableType = {
  PORT?: string | number;
  HOST?: string;
  EXTERNAL_CHAT_IA_URL: string;
  EXTERNAL_API_KEY: string;
};

export class EnvironmentVariable implements EnvironmentVariableType {
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
}
