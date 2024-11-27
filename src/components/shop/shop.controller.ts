import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Res, ParseIntPipe } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Request, Response } from 'express';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enums';
import { Public } from '../auth/guards/public';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('Shop')
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('create')
  @ApiOperation({summary:"creates a shop and updates a user's role to seller"})
  @ApiResponse({
    status: 200,
    description: "succesfully created a Shop"
  })
  create(@Body() createShopDto: CreateShopDto,@Req() request: Request,@Res() response:Response) {
    return this.shopService.create(createShopDto,request,response);
  }

  
  @Get('all')
  @ApiOperation({summary: "Fetch a list of shops"})
  @ApiOkResponse({
    description: "List of shops fetched successfully"
  })
  findAll() {
    return this.shopService.findAll();
  }
 
  @Get(':id')
  @ApiOperation({summary: "Fetch a specific shop by id"})
  @ApiOkResponse({
    description: "Specific shop fetched successfully"
  })
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.shopService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Updates shop details by id entered"})
  @ApiOkResponse({
    description: "Successfully updated shop details"
  })
  update(@Param('id',ParseIntPipe) id: number, @Body() updateShopDto: UpdateShopDto, @Res() response: Response) {
    return this.shopService.update(id, updateShopDto,response);
  }
  
  @Delete(':id')
  @ApiOperation({summary: "Deletes a specific shop by the given id"})
  @ApiOkResponse({
    description: "Successfully removed a shop "
  })
  remove(@Param('id',ParseIntPipe) shopid: number,@Req() request: Request,@Res() response:Response) {
    return this.shopService.remove(shopid,request,response);
  }
}
