import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { UsersModule } from '../users/users.module';
import { MailService } from '../services.ts/mail.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([Shop]),UsersModule,NotificationsModule
  ],
  controllers: [ShopController],
  providers: [ShopService,MailService,NotificationsService],
  exports : [TypeOrmModule]
})
export class ShopModule {}
