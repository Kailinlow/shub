import { AbstractAuditTableEntity } from 'src/common/abstract-audit-table.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'customer' })
export class CustomerEntity extends AbstractAuditTableEntity {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  numberPlate: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.customer)
  transactions: TransactionEntity[];
}
