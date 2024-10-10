import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UploadFileDto } from 'src/shared/dtos/upload-file.dto';
import { ReceiveTransactionFromFileDto } from './dtos/receive-transaction-from-file.dto';
import { QueryRunner } from 'typeorm';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionResultUploadFile } from './dtos/transaction-result-uploadfile.dto';
import * as excelToJson from 'convert-excel-to-json';
import * as fs from 'fs';
import {
  ImportFileConfig,
  templateColumn,
} from 'src/common/constant/import-file-config';
import { UtilsService } from 'src/common/utils/utils';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionDto } from './dtos/transaction.dto';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(public readonly transactionRepository: TransactionRepository) {}

  async getTotalValue(start: Date, end: Date) {
    let total = 0;
    const latestTransactions =
      await this.transactionRepository.getLatestTransactions(start, end);
    latestTransactions.forEach((item) => (total += item.totalValue));
    return total;
  }

  async importTransactionFromFile(file: UploadFileDto) {
    const [
      transactionDataRaw,
      invalidTransactions,
      validTransactions,
      transactionData,
    ] = await this.getTransactionsFromFileForImport(file);

    const [transactionSuccess, transactionError] =
      await this.importTransactions(transactionData);

    return new TransactionResultUploadFile(
      transactionDataRaw.length,
      validTransactions.length,
      invalidTransactions.length,
      invalidTransactions,
      transactionSuccess,
      transactionError,
    );
  }

  public async getTransactionsFromFileForImport(file: UploadFileDto) {
    const listTransactionRawData =
      await this.convertXlsxToListTransactionEntity(file);

    fs.unlinkSync(file.path);

    return listTransactionRawData;
  }

  async convertXlsxToListTransactionEntity(file: UploadFileDto) {
    let filePath: string;
    try {
      filePath = file.path;
    } catch {
      throw new BadRequestException('Could not get file');
    }
    let dataFile;
    try {
      dataFile = excelToJson({
        sourceFile: filePath,
        header: {
          rows: ImportFileConfig.HEADER_ROW,
        },
      });
      for (const key of Object.keys(dataFile)) {
        dataFile = dataFile[key];
        break;
      }
    } catch {
      throw new BadRequestException('Invalid excel file');
    }

    if (this.validateFile(dataFile) === false) {
      throw new BadRequestException('File is wrong format');
    }
    try {
      const dataJson = excelToJson({
        sourceFile: filePath,
        includeEmptyLines: true,
        header: {
          rows: ImportFileConfig.HEADER_ROW,
        },
      });

      const sheetName = Object.keys(dataJson)[0];
      const sheetData = dataJson[sheetName];

      //column[1]ToKey
      const headers = [];
      headers.push(
        Object.values(Object.values(dataJson)[0][ImportFileConfig.HEADER_ROW]),
      );

      const headerKeys = headers[0].map((header) =>
        UtilsService.toCamelCase(header),
      );

      const formatted = [];

      for (let i = ImportFileConfig.HEADER_ROW + 1; i < sheetData.length; i++) {
        const formattedItem = {};
        if (sheetData[i] == null) continue;
        headerKeys.forEach((key, index: number) => {
          const columnLetter = String.fromCharCode(
            ImportFileConfig.ASCII_CODE_DEFAULT_HEADER + index,
          );

          formattedItem[key] =
            sheetData[i][columnLetter]?.toString().trim() || '';
        });
        formatted.push(formattedItem);
      }

      return formatted;
    } catch {
      throw new BadRequestException('file is wrong format');
    }
  }

  public validateFile(dataFile) {
    let isTemplateFile = true;

    if (dataFile.length === 0) {
      isTemplateFile = false;
    } else {
      Object.keys(dataFile[0]).forEach((key, index) => {
        const normalizedStr = templateColumn[index]
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');

        const cleanedStr = normalizedStr.replace(/[^a-zA-Z0-9\s]/g, '');

        if (dataFile[0][key] !== cleanedStr) {
          isTemplateFile = false;
        }
      });
    }
    return isTemplateFile;
  }

  async importTransactions(transactionDatas: ReceiveTransactionFromFileDto[]) {
    const queryRunners: QueryRunner[] = [];
    const transactionError = [];
    const transactionSuccess = [];
    const countConnection = Math.min(transactionDatas.length, 10);
    // Create connection for each batch
    for (let i = 0; i < countConnection; i++) {
      const queryRunner =
        this.transactionRepository.manager.connection.createQueryRunner();
      await queryRunner.connect();
      queryRunners.push(queryRunner);
    }

    const promises = queryRunners.map(async (queryRunner) => {
      while (transactionDatas.length > 0) {
        const data = transactionDatas.pop();
        if (!data) break;

        const [result, error] = await this.proceedImportTransaction(
          data,
          queryRunner,
        );
        if (error) {
          transactionError.push(error);
        } else {
          transactionSuccess.push(result);
        }
      }
      // Release connection when the batch is done
      await queryRunner.release();
    });
    await Promise.all(promises);
    return [transactionSuccess, transactionError];
  }

  public async proceedImportTransaction(
    transactionInfo: ReceiveTransactionFromFileDto,
    queryRunner: QueryRunner,
  ) {
    let errorData = null;
    let result = null;
    let newTransaction: TransactionEntity = null;
    try {
      await queryRunner.startTransaction();

      const transactionData = new TransactionDto();
      transactionData.time = UtilsService.mergeDateTime(
        transactionInfo?.ngay,
        transactionInfo?.gio,
      );
      transactionData.amount = parseInt(transactionInfo?.soLuong);
      transactionData.price = parseFloat(transactionInfo?.donGia);
      transactionData.totalValue = parseFloat(transactionInfo?.thanhTien);
      transactionData.statusPayment = transactionInfo?.trangThaiThanhToan;
      transactionData.statusTransaction = transactionInfo.trangThaiHoaDon;

      (newTransaction = await queryRunner.manager.save(
        TransactionEntity,
        transactionData,
      )),
        await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(JSON.stringify({ error }));
      errorData = {
        stt: transactionInfo?.stt,
        message: error.message,
      };
    }

    return [result, errorData];
  }
}
