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
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private readonly shoprep : Repository<Shop>,
    @InjectRepository(Users)
    private readonly usersrep : Repository<Users>,
    @Inject()
    private usersService : UsersService,
    private mailService : MailService,
    private readonly notify : NotificationsService,
  ){}

  async create(createShopDto: CreateShopDto,@Req() req:Request, @Res() res:Response) {
    try{
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

    await this.shoprep.save(shop)
    await this.notify.create({
    user: user,
    isread: false,
    created_at: new Date(),
    text:'You have successfully created a shop,Explore our different features in our app.post your first product in a single click'      
    })
    await this.usersService.update({
      ...UpdateUserDto,
      role : Role.SELLER
     },
     user,
      req
    )
    await this.mailService.sendShopCreatedEmail(ShopOwner.email,ShopOwner.name,createShopDto.name)
    const ownerReponse ={
      userid : ShopOwner.userid,
      name : ShopOwner.name,
      location: ShopOwner.location,
      
    }

    res.setHeader('Role',Role.SELLER)
    return res.status(201).json({
      shopid:shop.shopid,
      name: shop.name,
      description: shop.description,
      image: shop.image,
      owner : ownerReponse
    })

  }catch(error){
    res.status(500).json({
      message:'Internal server error',
      error: error.message
    })
  }
}

  async findAll() {
    return await this.shoprep.find({relations:['owner'],
      select:{
        owner:{
          userid: true,
          name: true,
          email: true,
          role: true
        }
      }
    })
  }

  async findOne(shpoid : number) {
    const shop = await this.shoprep.findOne({where : {shopid:shpoid},
      relations:['owner'],
      select:{
        owner:{
          userid: true,
          name: true,
          email: true,
          role: true
        }
      }
    })
    
    if(!shop){
      throw new UnauthorizedException('you do not have a shop')
    }
    return shop
  }

  async update(shopid: number, updateShopDto: UpdateShopDto,res : Response) {
    try {
    const shop = await this.shoprep.findOne({where : {shopid}})
    
    if(!shop){
      throw new NotFoundException('Shop not found')
    }
    Object.assign(shop,updateShopDto)
    await this.shoprep.save(shop)
    
    res.status(200).json({
      message : "Successfully updated shop details"
    })
  }catch(error) {
    res.status(500).json({
      message : "Internal Server error", error
    })
  }
  }

  async remove(shopid: number,@Req() req: Request,@Res() res:Response) {
    try{
    const shop = await this.shoprep.findOne({where :{shopid}})
    const user = req.user?.userid

    if (!shop){
      throw new NotFoundException('Shop Not Found')
    }
    await this.shoprep.delete(shopid)
    await this.usersService.update(
      {
     ...UpdateUserDto,
     role : Role.BUYER
    },
    user,
     req,
      
    )
    res.setHeader('Role',Role.BUYER)
    res.status(200).json({
      message:'Successfully deleted shop'
    });
  }catch(error){
    res.status(500).json({
      message:'Internal server error',
      error : error.message
    })
  }
}
}
