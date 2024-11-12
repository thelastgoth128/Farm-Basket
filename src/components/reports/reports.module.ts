import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reports } from './entities/report.entity';
import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports :[
    TypeOrmModule.forFeature([Reports]),UsersModule,ProductsModule
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
