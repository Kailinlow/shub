import { IsArray, IsNumber } from 'class-validator';
import { InvalidResultUploadFile } from './invald-result-upload.dto';

export class TransactionResultUploadFile {
  @IsNumber()
  total: number;

  @IsNumber()
  valid: number;

  @IsNumber()
  invalid: number;

  @IsArray()
  invalidList: InvalidResultUploadFile[];

  transactionError: any;

  transactionSuccess: any;

  constructor(
    total: number,
    valid: number,
    invalid: number,
    invalidList: InvalidResultUploadFile[],
    transactionSuccess: any,
    transactionError: any,
  ) {
    this.total = total;
    this.valid = valid;
    this.invalid = invalid;
    this.invalidList = invalidList;
    this.transactionSuccess = transactionSuccess;
    this.transactionError = transactionError;
  }
}
