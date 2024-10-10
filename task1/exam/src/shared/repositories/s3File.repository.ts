import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { S3FileDto } from '../dtos/S3FileDto';
import { S3FileEntity } from '../entities/s3File.entity';

@Injectable()
export class S3FileRepository extends Repository<S3FileEntity> {
  constructor(dataSource: DataSource) {
    super(S3FileEntity, dataSource.createEntityManager());
  }

  public async addS3File(
    data: S3FileDto,
    s3Key: string,
  ): Promise<S3FileEntity> {
    let entity = await this.findOne({ where: { key: s3Key } });
    if (!entity) {
      entity = this.create();
    }

    entity = this.merge(entity, data, {
      originalName: data.originalName,
      mimeType: data.mimeType,
      fileName: data.fileName,
      key: s3Key,
    });

    return this.save(entity, { reload: true });
  }
}
