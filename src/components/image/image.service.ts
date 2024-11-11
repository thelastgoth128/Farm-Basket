import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Shop } from "../shop/entities/shop.entity";
import { Repository } from "typeorm";
import { Products } from '../products/entities/product.entity';


@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Shop)
    private readonly shoprep : Repository<Shop>,
    @InjectRepository(Products)
    private readonly productrep : Repository<Products>
){}

async saveShopImageUrl(shopid: number, imageUrl : string): Promise<void> {
    const shop = await this.shoprep.findOne({where : {shopid}})
    if (!shop) {
       throw new HttpException('Shop not found', HttpStatus.NOT_FOUND) 
    }
    shop.image = imageUrl
    await this.shoprep.save(shop)
}

async saveProductImageUrl(productid : number, imageUrl: string): Promise<void> {
  const product = await this.productrep.findOne({where : {productid}})
  if (!product) {
    throw new HttpException('Product not found',HttpStatus.NOT_FOUND)
  }
  product.image = imageUrl
  await this.productrep.save(product)
}
}
