import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem } from './entities/cart.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { ProductsModule } from '../products/products.module';
import { ShopModule } from '../shop/shop.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cart,CartItem]),UsersModule,ProductsModule,ShopModule,
  ],
  providers: [CartService,UsersService],
  controllers: [CartController],
  exports: [TypeOrmModule,CartService]
})
export class CartModule {}
