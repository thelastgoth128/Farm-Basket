import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Webhook } from './entities/webhook.entity';
import { UsersModule } from '../users/users.module';
import { PaymentModule } from '../payment/payment.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Webhook]),UsersModule,PaymentModule,HttpModule
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
  exports:[TypeOrmModule]
})
export class WebhookModule {}
