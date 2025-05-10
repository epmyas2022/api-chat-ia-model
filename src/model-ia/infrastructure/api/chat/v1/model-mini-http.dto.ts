import { Type } from 'class-transformer';
import {
  IsArray,
  ValidateNested,
  IsString,
  IsNotEmpty,
  IsIn,
  ArrayNotEmpty,
  IsOptional,
} from 'class-validator';

export class ModelMiniMessage {
  @IsString()
  @IsNotEmpty()
  @IsIn(['user', 'assistant'])
  role: 'user' | 'assistant';

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class ModelMiniHttpDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => ModelMiniMessage)
  messages: ModelMiniMessage[];

  @IsString()
  @IsOptional()
  cursor?: string;
}
