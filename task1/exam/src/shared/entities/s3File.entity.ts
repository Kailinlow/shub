import { AbstractAuditTableEntity } from 'src/common/abstract-audit-table.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 's3_files' })
export class S3FileEntity extends AbstractAuditTableEntity {
  @Column({ name: 'file_name' })
  fileName: string;

  @Column({ name: 'mime_type' })
  mimeType: string;

  @Column({ name: 'original_name' })
  originalName: string;

  @Column({ name: 'size' })
  size: number;

  @Column({ name: 'key' })
  key: string;
}
