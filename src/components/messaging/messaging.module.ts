import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from './entities/inbox.entity';
import { Messages } from './entities/messaging.entity';
import { InboxParticipants } from './entities/inbox_participants.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports : [
    TypeOrmModule.forFeature([Inbox,Messages,InboxParticipants]),UsersModule
  ],
  controllers: [MessagingController],
  providers: [MessagingService],
})
export class MessagingModule {}
