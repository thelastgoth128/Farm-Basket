import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from '../users/users.module';
import { PaymentModule } from '../payment/payment.module';
import { CartModule } from '../cart/cart.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order]),UsersModule,CartModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports:[TypeOrmModule]
})
export class OrdersModule {}
