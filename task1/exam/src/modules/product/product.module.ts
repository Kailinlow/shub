import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { TransactionEntity } from '../transaction/entities/transaction.entity';
import { PumpingStationEntity } from '../pumping-station/entities/pumping-station.entity';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    TransactionModule,
    PumpingStationEntity,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
