import { AbstractAuditTableEntity } from 'src/common/abstract-audit-table.entity';
import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { GasStationEntity } from 'src/modules/gas-station/entities/gas-station.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { PumpingStationEntity } from 'src/modules/pumping-station/entities/pumping-station.entity';
import { StaffEntity } from 'src/modules/staff/entities/staff.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'transaction' })
export class TransactionEntity extends AbstractAuditTableEntity {
  @Column()
  index: number;

  @Column()
  time: Date;

  @Column()
  amount: number;

  @Column()
  price: number;

  @Column()
  totalValue: number;

  @Column()
  statusPayment: string;

  @Column()
  statusTransaction: string;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => StaffEntity)
  @JoinColumn({ name: 'staff_id' })
  staff: StaffEntity;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => GasStationEntity)
  @JoinColumn({ name: 'gas_station_id' })
  gasStation: GasStationEntity;

  @ManyToOne(() => PumpingStationEntity)
  @JoinColumn({ name: 'pumping_station_id' })
  pumpingStation: PumpingStationEntity;
}
