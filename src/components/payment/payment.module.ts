import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from './entities/payment.entity';
import { UsersModule } from '../users/users.module';
import { HttpModule } from '@nestjs/axios';
import { ProductsModule } from '../products/products.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Payments]),UsersModule,HttpModule,ProductsModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports:[TypeOrmModule]
})
export class PaymentModule {}
