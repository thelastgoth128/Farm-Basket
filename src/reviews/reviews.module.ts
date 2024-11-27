import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { UsersModule } from 'src/components/users/users.module';
import { ProductsModule } from 'src/components/products/products.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Review]),UsersModule,ProductsModule
  ],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports:[TypeOrmModule],
})
export class ReviewsModule {}
