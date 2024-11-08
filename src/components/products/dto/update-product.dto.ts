import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {IsInt, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsInt()
    userid: number;

    @IsString()
    name: string;
  
    @IsString()
    description: string;
    
    @IsInt()
    quantity: number;
  
    @IsInt()
    price: number;

    @IsString()
    type: string;
  
}
