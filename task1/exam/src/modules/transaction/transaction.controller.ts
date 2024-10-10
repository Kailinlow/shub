import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from 'src/shared/dtos/upload-file.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/uploads')
  @HttpCode(HttpStatus.OK)
  importTransactionFromFile(@UploadedFile() file: UploadFileDto) {
    return this.transactionService.importTransactionFromFile(file);
  }

  @Get('/totals')
  @HttpCode(HttpStatus.OK)
  getTotalValue(@Param('start') start: Date, @Param('end') end: Date) {
    return this.transactionService.getTotalValue(start, end);
  }
}
