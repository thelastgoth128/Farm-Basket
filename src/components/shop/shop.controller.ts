import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Request, Response } from 'express';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enums';
import { Public } from '../auth/guards/public';

@Public()
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('create')
  create(@Body() createShopDto: CreateShopDto,@Req() request: Request,@Res() response:Response) {
    return this.shopService.create(createShopDto,request,response);
  }

  
  @Get('all')
  findAll() {
    return this.shopService.findAll();
  }
 
  @Get(':id')
  findOne(@Req() request:Request) {
    return this.shopService.findOne(request);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopService.update(+id, updateShopDto);
  }
  
  @Delete(':id')
  remove(@Param('id') shopid: number,@Req() request: Request,@Res() response:Response) {
    return this.shopService.remove(shopid,request,response);
  }
}
