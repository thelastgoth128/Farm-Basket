import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Shop } from "../shop/entities/shop.entity";
import { Repository } from "typeorm";


@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Shop)
    private readonly shoprep : Repository<Shop>,
){}

async saveImageUrl(shopid: number, imageUrl : string): Promise<void> {
    const shop = await this.shoprep.findOne({where : {shopid}})
    if (!shop) {
       throw new HttpException('Shop not found', HttpStatus.NOT_FOUND) 
    }
    shop.image = imageUrl
    await this.shoprep.save(shop)
}
}
