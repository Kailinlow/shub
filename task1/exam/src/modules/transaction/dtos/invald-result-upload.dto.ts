import { IsNumber } from 'class-validator';

export class InvalidResultUploadFile {
  @IsNumber()
  stt: number;

  @IsNumber()
  messageError: string;

  @IsNumber()
  trangThaiHoaDon: string;

  constructor(no: number, messageError: string, email: string) {
    this.stt = no;
    this.messageError = messageError;
    this.trangThaiHoaDon = email;
  }
}
