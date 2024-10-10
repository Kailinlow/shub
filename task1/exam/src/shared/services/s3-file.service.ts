import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Message } from 'src/common/constant/constant-value';
import { generateFilename } from 'src/common/utils/utils';
import { S3FileDto } from '../dtos/S3FileDto';
import { S3FileRepository } from '../repositories/s3File.repository';
import { ConfigService } from './config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class S3FileService {
  private readonly _privateS3: AWS.S3;
  private readonly _publicS3: AWS.S3;
  private readonly _privateBucketName;
  private readonly _publicBucketName;
  private readonly _s3Config;

  // Public = Public Bucket
  // Private = Private Bucket

  constructor(
    public readonly configService: ConfigService,
    public readonly generatorService: GeneratorService,
    public readonly s3FileRepository: S3FileRepository,
  ) {
    this._s3Config = this.configService.awsS3Config;
    this._privateS3 = new AWS.S3({
      accessKeyId: this._s3Config.s3AccessKey,
      secretAccessKey: this._s3Config.s3SecretAccessKey,
    });
    this._publicS3 = new AWS.S3({
      accessKeyId: this._s3Config.s3PublicBucketAccessKey,
      secretAccessKey: this._s3Config.s3PublicBucketSecretAccessKey,
      region: this._s3Config.s3Region,
    });

    this._privateBucketName = this._s3Config.s3BucketName;
    this._publicBucketName = this._s3Config.s3PublicBucketName;
  }

  async getPublicFileLink(key: string): Promise<string> {
    const params = {
      Bucket: this._privateBucketName,
      Expires: this._s3Config.s3GetExpired,
      Key: key,
    };
    let res = null;
    try {
      res = this._privateS3.getSignedUrl('getObject', params);
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        'cannot connect to aws s3 service',
      );
    }
    return res;
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    const fileName = file.filename || file.originalname;
    const generated: { filename } = generateFilename(fileName);
    const s3Key = `${generated.filename}`;

    const params: AWS.S3.Types.PutObjectRequest = {
      Bucket: this._privateBucketName,
      Key: s3Key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    let res = null;
    try {
      res = await this._privateS3.upload(params).promise();
    } catch (err) {
      throw new InternalServerErrorException(
        err,
        'cannot connect to aws s3 service',
      );
    }

    const preSignedUrl = await this.getPublicFileLink(s3Key);

    const newFile = new S3FileDto();
    newFile.fileName = fileName;
    newFile.originalName = file.originalname;
    newFile.mimeType = file.mimetype;
    newFile.size = file.size;
    return {
      meta: {
        status: Message.success,
      },
      data: {
        url: res.Location,
        preSignedUrl: preSignedUrl,
        ...(await this.s3FileRepository.addS3File(newFile, s3Key)),
      },
    };
  }
}
