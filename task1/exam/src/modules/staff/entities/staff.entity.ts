import { AbstractAuditTableEntity } from 'src/common/abstract-audit-table.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'admin' })
export class StaffEntity extends AbstractAuditTableEntity {
  @Column({ unique: true, nullable: false })
  name: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.staff)
  transactions: TransactionEntity[];
}
