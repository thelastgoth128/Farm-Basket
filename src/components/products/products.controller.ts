import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from '../auth/guards/public';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Public()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @ApiOperation({summary:"creates a shop and updates a user's role to seller"})
  @ApiResponse({
    status: 200,
    description: "succesfully posted a product"
  })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({summary:"fetches all products"})
  @ApiOkResponse({
    description: "Successfully fetched all products"
  })
  findAllProducts() {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  @ApiOperation({summary:"fetches a specific product by id"})
  @ApiOkResponse({
    description: "Successfully fetched a product  by id"
  })
  findProductById(@Param('id') id: number) {
    return this.productsService.findProductById(id);
  }

  @Get(':shopid/products')
  @ApiOperation({summary:"fetches all products for a particular product"})
  @ApiOkResponse({
    description: "Successfully fetched all products for a particular shop by id"
  })
  findShopProducts(@Param('shopid') shopid : number){
    return this.productsService.findShopProduct(shopid)
  }

  @Patch(':id')
  @ApiOperation({summary:"Updates products details"})
  @ApiOkResponse({
    description: "Successfully updated product's details"
  })
  updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete('delete/:id')
  @ApiOperation({summary:"Deletes a product"})
  @ApiOkResponse({
    description: "Successfully deleted a product"
  })
  removeProduct(@Param('id') id: number) {
    return this.productsService.removeProduct(id);
  }
}