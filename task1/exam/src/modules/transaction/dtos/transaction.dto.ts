import { CustomerEntity } from 'src/modules/customer/entities/customer.entity';
import { GasStationEntity } from 'src/modules/gas-station/entities/gas-station.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { PumpingStationEntity } from 'src/modules/pumping-station/entities/pumping-station.entity';
import { StaffEntity } from 'src/modules/staff/entities/staff.entity';

export class TransactionDto {
  time: Date;

  amount: number;

  price: number;

  totalValue: number;

  statusPayment: string;

  statusTransaction: string;

  customer: CustomerEntity;

  staff: StaffEntity;

  product: ProductEntity;

  gasStation: GasStationEntity;

  pumpingStation: PumpingStationEntity;
}
