import { Module } from '@nestjs/common';
import { GasStationService } from './gas-station.service';
import { GasStationController } from './gas-station.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasStationEntity } from './entities/gas-station.entity';
import { TransactionEntity } from '../transaction/entities/transaction.entity';
import { PumpingStationEntity } from '../pumping-station/entities/pumping-station.entity';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GasStationEntity]),
    PumpingStationEntity,
    TransactionModule,
  ],
  controllers: [GasStationController],
  providers: [GasStationService],
})
export class GasStationModule {}
