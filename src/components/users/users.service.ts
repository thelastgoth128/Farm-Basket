import { ForbiddenException, Injectable, NotFoundException, Req, Res, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Role } from '../enums/role.enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersrep : Repository<Users>,
    private  jwtService : JwtService
  ){}

  async create(createUserDto: CreateUserDto,@Res({passthrough:true}) response:Response) {
    const { email } = createUserDto;

    const exists = await this.usersrep.findOne({where: {email}})
    if(exists){
      throw new ForbiddenException('email already exists, please login')
    }
    createUserDto.role=createUserDto.role || Role.BUYER
    const user = await this.usersrep.save(createUserDto)

    const payload = {
      userid:user.userid,
      email:user.email,
      name:user.name,
      role:user.role,
      location:user.location
    }
    const jwt = await this.jwtService.signAsync(payload, {
      secret:'hello'
    })
    response.cookie('jwt',jwt,{
      httpOnly: true,
      secure:true,
      maxAge:360000,
    })
    return {
      message: 'Account succesfully created'
    };
  }

  async findAll() {
    return await this.usersrep.find() 
  }

  async findMail(email : string):Promise<Users | undefined>{
    return await this.usersrep.findOne({where : {email}})
  }

  async findOne(userid: number) {
    return await this.usersrep.findOne({where : {userid}})
  }

  async update(updateUserDto: UpdateUserDto,@Req() req:Request) {
    const userid = req.user?.userid
    const requester = await this.usersrep.findOne({where : {userid}})

    if (!requester){
      throw new NotFoundException('user not found')
    }

    Object.assign(requester,updateUserDto)

    await this.usersrep.save(requester)

    return{
      message : 'successfully updated'
    }
  }

  async makeAdmin(userid,updateUserDto : UpdateUserDto){
    const admin = await this.usersrep.findOne({where : {userid}})
    if (!admin){
      throw new NotFoundException('user not found')
    }
    Object.assign(admin,updateUserDto)
    await this.usersrep.save(admin)
    return {
      message : 'Successfully added an Admin'
    }

  }

  async remove(@Req() req:Request) {
    const userid = req.user?.userid
    const requester = await this.usersrep.findOne({where : {userid}})
    
    if (!requester){
      throw new NotFoundException('user not found')
    }

    await this.usersrep.delete(userid)
    return{
      message : 'successfully deleted user'
    }
  }
}
