import { AbstractAuditTableEntity } from 'src/common/abstract-audit-table.entity';
import { PumpingStationEntity } from 'src/modules/pumping-station/entities/pumping-station.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'gas_station' })
export class GasStationEntity extends AbstractAuditTableEntity {
  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.gasStation)
  transactions: TransactionEntity[];

  @OneToMany(
    () => PumpingStationEntity,
    (pumpingStation) => pumpingStation.gasStation,
  )
  pumpingStations: PumpingStationEntity[];
}
