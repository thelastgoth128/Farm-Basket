import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Users)
    private readonly userrep : Repository<Users>
  ) {}

  async createProduct(createProductDto: CreateProductDto){
    const { userid,shopid, ...productData } = createProductDto
    const user = await this.userrep.findOne({where : {userid}})

    if (!user) {
      throw new NotFoundException('user not found')
    }
    const product = new Products()
      product.userid = user
      
    const savedProduct = await this.productsRepository.save(product)
    return savedProduct
  }

  async findAllProducts(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async findProductById(productid: number): Promise<Products> {
    const product = await this.productsRepository.findOne({where:{productid}});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
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
