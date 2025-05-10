import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class ModelMiniHttpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  message: string;

  @IsString()
  @IsOptional()
  cursor?: string;
}
