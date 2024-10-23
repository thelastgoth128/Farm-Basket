import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PassThrough } from 'stream';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto,@Res({passthrough:true}) response:Response) {
    const hash = await bcrypt.hash(createUserDto.password,12)
    createUserDto.password = hash
    return await this.usersService.create(createUserDto,response)
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Req()request:Request) {
    return this.usersService.update(+id, updateUserDto,request);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req() request:Request) {
    return this.usersService.remove(+id,request);
  }
}
