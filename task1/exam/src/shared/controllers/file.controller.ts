import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { UploadFile } from 'src/common/decorators/upload-file.decorator';
import { FileSize } from 'src/common/enums/file';
import { S3FileService } from '../services/s3-file.service';

@Controller('file')
export class FileUtilController {
  constructor(public readonly s3FileService: S3FileService) {}

  @Post('/upload')
  @UploadFile()
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 20 * FileSize.OneMb }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.s3FileService.uploadFile(file);
  }
}
