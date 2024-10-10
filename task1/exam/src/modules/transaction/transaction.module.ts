import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { PumpingStationEntity } from '../pumping-station/entities/pumping-station.entity';
import { GasStationEntity } from '../gas-station/entities/gas-station.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { StaffEntity } from '../staff/entities/staff.entity';
import { CustomerEntity } from '../customer/entities/customer.entity';
import { TransactionRepository } from './repositories/transaction.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]),
    PumpingStationEntity,
    GasStationEntity,
    ProductEntity,
    StaffEntity,
    CustomerEntity,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
