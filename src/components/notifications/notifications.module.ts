import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from './entities/notification.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Notifications]),UsersModule
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports : [TypeOrmModule,NotificationsService]
})
export class NotificationsModule {}
