import { IsInt, IsString } from 'class-validator';

export class UploadFileDto {
  @IsString({
    message: 'FileName is required',
  })
  filename: string;

  @IsString({
    message: 'MimeType is required',
  })
  mimetype: string;

  @IsString({
    message: 'OriginalName is required',
  })
  originalname: string;

  @IsInt({
    message: 'Size is required',
  })
  size: number;

  @IsString({
    message: 'Path is required',
  })
  path: string;
}
