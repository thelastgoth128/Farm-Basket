import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from '../services.ts/mail.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Users]),
    JwtModule
  ],
  controllers: [UsersController],
  providers: [UsersService,MailService],
  exports :[TypeOrmModule,UsersService]
})
export class UsersModule {}
