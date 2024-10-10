import { AbstractAuditTableEntity } from 'src/common/abstract-audit-table.entity';
import { PumpingStationEntity } from 'src/modules/pumping-station/entities/pumping-station.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity extends AbstractAuditTableEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.product)
  transactions: TransactionEntity[];

  @OneToMany(
    () => PumpingStationEntity,
    (pumpingStation) => pumpingStation.product,
  )
  pumpingStations: PumpingStationEntity[];
}
