import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './modules/transaction/transaction.module';
import { GasStationModule } from './modules/gas-station/gas-station.module';
import { ProductModule } from './modules/product/product.module';
import { CustomerModule } from './modules/customer/customer.module';
import { StaffModule } from './modules/staff/staff.module';
import { PumpingStationModule } from './modules/pumping-station/pumping-station.module';

@Module({
  imports: [
    TransactionModule,
    GasStationModule,
    ProductModule,
    CustomerModule,
    StaffModule,
    PumpingStationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
