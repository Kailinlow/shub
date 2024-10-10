import { Exclude, Type } from 'class-transformer';
import { IsMimeType, IsNumber, IsOptional, IsString } from 'class-validator';

export class S3FileDto {
  @IsString()
  @Type(() => String)
  fileName: string;

  @IsMimeType()
  @Type(() => String)
  @Type(() => String)
  mimeType: string;

  @Exclude()
  @IsString()
  @Type(() => String)
  originalName = '';

  @IsOptional()
  @IsString()
  @Type(() => String)
  parentDirectory: string;

  @Exclude()
  @Type(() => Number)
  @IsNumber()
  size = 0;

  constructor() {
    this.parentDirectory = '';
  }
}
