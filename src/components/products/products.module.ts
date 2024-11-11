import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Products]),UsersModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[TypeOrmModule]
})
export class ProductsModule {}
