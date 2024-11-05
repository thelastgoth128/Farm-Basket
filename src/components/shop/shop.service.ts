import { Inject, Injectable, NotFoundException, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { Role } from '../enums/role.enums';
import { MailService } from '../services.ts/mail.service';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shoprep : Repository<Shop>,
    @InjectRepository(Users)
    private readonly usersrep : Repository<Users>,
    @Inject()
    private usersService : UsersService,
    private mailService : MailService
  ){}

  async create(createShopDto: CreateShopDto,@Req() req:Request,@Res() res:Response) {
    const { owner, ...shopData } = createShopDto
    const user = req.user?.userid;
    const ShopOwner = await this.usersrep.findOne({where : { userid : user}})
    
    if(!ShopOwner){
      throw new UnauthorizedException('you cannot create shop')
    }

    const shop = this.shoprep.create({
      ...shopData,
      owner : ShopOwner
    });
    await this.usersService.update({
      ...UpdateUserDto,
      role : Role.SELLER
     },
      req
     )

     res.setHeader('Role',Role.SELLER)
    await this.shoprep.save(shop)
    await this.mailService.sendShopCreatedEmail(ShopOwner.email,ShopOwner.name,createShopDto.name)
    return{
      message : 'you have successfully created a shop'
    }
        
  }

  async findAll() {
    return await this.shoprep.find()
  }

  async findOne(@Req() req : Request) {
    const user = req.user?.userid
    const owner = await this.shoprep.findOne({where : {owner : {userid : user}}})
    
    if(!owner){
      throw new UnauthorizedException('you do not have a shop')
    }
    return owner
  }

  async update(shopid: number, updateShopDto: UpdateShopDto) {
    const shop = await this.shoprep.findOne({where : {shopid}})
    
    if(!shop){
      throw new NotFoundException('Shop not found')
    }
    Object.assign(shop)
    await this.shoprep.save(shop)
    return {
      message : 'succesfully updated shop details'
    }
  }

  async remove(shopid: number,@Req() req: Request,@Req() res:Response) {
    await this.shoprep.delete(shopid)
    await this.usersService.update({
     ...UpdateUserDto,
     role : Role.BUYER
    },
     req
    )
    res.setHeader('Role',Role.BUYER)
    return {
      message : 'Successfully deleted shop'
    }
  }
}
