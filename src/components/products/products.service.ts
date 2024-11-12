import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/product.entity';
import { Shop } from '../shop/entities/shop.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Users)
    private readonly userrep : Repository<Users>,
    @InjectRepository(Shop)
    private readonly shoprep : Repository<Shop>
  ) {}

  async createProduct(createProductDto: CreateProductDto){
    const { userid,shopid, ...productData } = createProductDto
    const user = await this.userrep.findOne({where : {userid}})
    const shop = await this.shoprep.findOne({where:{shopid}})

    if (!user) {
      throw new NotFoundException('user not found')
    }

    if (!shop) {
      throw new NotFoundException('Shop does not exist')
    }

    const product = new Products()
    product.userid = user
    product.shop = shop
    product.name = createProductDto.name
    product.price = createProductDto.price
    product.quantity = createProductDto.quantity
    product.type = createProductDto.type
    product.description = createProductDto.description

    return await this.productsRepository.save(product)
  }

  async findAllProducts(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async findProductById(productid: number): Promise<Products> {
    const product = await this.productsRepository.findOne({where:{productid},relations:['shopid']});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findShopProduct(shopid : number) {
   const shop = await this.productsRepository.find({where : {shop:{shopid : shopid}},relations:['shop']})

   if (!shop) {
    throw new NotFoundException('shop not found')
   }
   return shop
   
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Products> {
    const product = await this.findProductById(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async removeProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);
    await this.productsRepository.remove(product);
  }
}
