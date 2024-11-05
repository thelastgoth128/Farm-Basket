import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'typeOrmConfig';
import { Shop } from './entities/shop.entity';
import { UsersModule } from '../users/users.module';
import { MailService } from '../services.ts/mail.service';

@Module({
  imports : [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Shop]),UsersModule
  ],
  controllers: [ShopController],
  providers: [ShopService,MailService],
  exports : [TypeOrmModule]
})
export class ShopModule {}
