import { IsNumber, IsOptional, IsString } from 'class-validator';

export type EnvironmentVariableType = {
  PORT?: string | number;
  HOST?: string;
};

export class EnvironmentVariable implements EnvironmentVariableType {
  @IsString()
  @IsNumber()
  @IsOptional()
  PORT?: string | number;

  @IsString()
  @IsOptional()
  HOST?: string;
}
