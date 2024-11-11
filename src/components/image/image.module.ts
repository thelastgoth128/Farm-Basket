import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ShopModule } from '../shop/shop.module';
import { CloudinaryService } from '../services.ts/cloudinary.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports:[ShopModule,ProductsModule],
  controllers: [ImageController],
  providers: [ImageService,CloudinaryService],
  exports:[ImageService]
})
export class ImageModule {}
