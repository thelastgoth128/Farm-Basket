import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reports } from './entities/report.entity';

@Module({
  imports :[
    TypeOrmModule.forFeature([Reports])
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
