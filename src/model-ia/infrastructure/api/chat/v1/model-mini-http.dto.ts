import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  IsObject,
  IsUrl,
  ValidateNested,
  ValidateIf,
  IsIn,
} from 'class-validator';

export class ContextDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  message: string;
}

export class ContextExternalDto {
  @IsOptional()
  @IsObject()
  headers?: Record<string, string>;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  endpoint: string;

  @IsString()
  jsonPath: string;

  @IsOptional()
  @IsObject()
  query?: Record<string, string>;
}
export class ContextApi {
  @IsString()
  @IsNotEmpty()
  @IsIn(['standard', 'external'])
  driver: 'standard' | 'external';

  @ValidateIf((o: ContextApi) => o.driver === 'standard')
  @IsObject()
  @ValidateNested()
  @Type(() => ContextDto)
  context?: ContextDto;

  @ValidateIf((o: ContextApi) => o.driver === 'external')
  @IsObject()
  @ValidateNested()
  @Type(() => ContextExternalDto)
  external?: ContextExternalDto;
}
export class ModelMiniHttpDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  message: string;

  @IsString()
  @IsOptional()
  cursor?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ContextApi)
  contextApi?: ContextApi;
}
