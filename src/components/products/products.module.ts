import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { UsersModule } from '../users/users.module';
import { ShopModule } from '../shop/shop.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Products]),UsersModule,ShopModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService,TypeOrmModule]
})
export class ProductsModule {}
