import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { StaffEntity } from './entities/staff.entity';
import { TransactionEntity } from '../transaction/entities/transaction.entity';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity]), TransactionModule],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
