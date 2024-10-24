import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeOrmConfig';
import { Users } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Users]),
    JwtModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
