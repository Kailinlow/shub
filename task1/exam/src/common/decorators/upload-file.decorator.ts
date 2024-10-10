import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export function UploadFile() {
  return applyDecorators(UseInterceptors(FileInterceptor('file')));
}
