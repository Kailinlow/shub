import { AbstractAuditTableEntity } from 'src/common/abstract-audit-table.entity';
import { GasStationEntity } from 'src/modules/gas-station/entities/gas-station.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'pumping_station' })
export class PumpingStationEntity extends AbstractAuditTableEntity {
  @Column()
  name: string;

  @OneToMany(
    () => TransactionEntity,
    (transaction) => transaction.pumpingStation,
  )
  transactions: TransactionEntity[];

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => GasStationEntity)
  @JoinColumn({ name: 'gas_station_id' })
  gasStation: GasStationEntity;
}
