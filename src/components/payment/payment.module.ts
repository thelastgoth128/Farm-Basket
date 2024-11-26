import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from './entities/payment.entity';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { ProductsModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';
import { CartService } from '../cart/cart.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Payments]),UsersModule,HttpModule,ProductsModule,CartModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService,CartService],
  exports:[TypeOrmModule]
})
export class PaymentModule {}
