import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PumpingStationService } from './pumping-station.service';
import { PumpingStationController } from './pumping-station.controller';
import { PumpingStationEntity } from './entities/pumping-station.entity';
import { GasStationEntity } from '../gas-station/entities/gas-station.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { TransactionEntity } from '../transaction/entities/transaction.entity';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PumpingStationEntity]),
    GasStationEntity,
    ProductEntity,
    TransactionModule,
  ],
  controllers: [PumpingStationController],
  providers: [PumpingStationService],
})
export class PumpingStationModule {}
