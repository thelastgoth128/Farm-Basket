import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PassThrough } from 'stream';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt'
import { Public } from '../auth/guards/public';
import { Roles } from '../decorators/roles.decorators';
import { Role } from '../enums/role.enums';
import { AuthGuard } from '../auth/guards/authGuard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post('register')
  @ApiOperation({summary: "register a first time user with a unique email"})
  //@ApiOkResponse // created //bad error
  //@ApiNotFoundRsponse({description: "not found"})
  @ApiResponse({
    status: 200,
    description: "succesfully createa a user"
  })
  async create(@Body() createUserDto: CreateUserDto,@Res({passthrough:true}) response:Response) {
    const hash = await bcrypt.hash(createUserDto.password,12)
    createUserDto.password = hash
    return await this.usersService.create(createUserDto,response)
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') userid: number, @Body() updateUserDto: UpdateUserDto,@Req()request:Request) {
    return this.usersService.update(updateUserDto,userid,request);
  }


  @Patch(':userid')
  makeAdmin(@Param('userid',ParseIntPipe) userid: number, @Body() UpdateUserDto: UpdateUserDto){
    return this.usersService.makeAdmin(userid,UpdateUserDto)
  }

  @Patch('ban/:userid')
  banUser(@Param('userid')userid: number) {
    return this.usersService.banUser(userid)
  }

  @Patch('activate/:userid')
  activateUser(@Param('userid') userid : number) {
    return this.usersService.activateUser(userid)
  }

  @Delete('delete')
  remove(@Req() request:Request) {
    return this.usersService.remove(request);
  }

  @Delete(':userid')
  removedByAdmin(@Param('userid') userid : number) {
    return this.usersService.removedByAdmin(userid)
  }
}
