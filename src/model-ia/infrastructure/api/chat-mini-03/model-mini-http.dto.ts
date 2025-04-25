import { Type } from 'class-transformer';
import {
  IsArray,
  ValidateNested,
  IsString,
  IsNotEmpty,
  IsIn,
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
  @Type(() => ModelMiniMessage)
  messages: {
    role: string;
    content: string;
  }[];
}
