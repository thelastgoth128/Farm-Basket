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
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
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

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('all')
  @ApiOperation({summary: "Fetch a list of users"})
  @ApiOkResponse({
    description: "List of users fetched successfully",
    type: CreateUserDto,
    isArray:true
  })
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  @ApiOperation({summary: "Fetch a specific user"})
  @ApiOkResponse({
    description: "user fetched successfully"
  })
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({summary: "Update user details"})
  @ApiOkResponse({
    description: "Successfully updated a user "
  })
  update(@Param('id', ParseIntPipe) userid: number, @Body() updateUserDto: UpdateUserDto,@Req()request:Request) {
    return this.usersService.update(updateUserDto,userid,request);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(':userid')
  @ApiOperation({summary: "Update user details"})
  @ApiOkResponse({
    description: "Successfully updated a users role to admin "
  })
  makeAdmin(@Param('userid',ParseIntPipe) userid: number, @Body() UpdateUserDto: UpdateUserDto){
    return this.usersService.makeAdmin(userid,UpdateUserDto)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch('ban/:userid')
  @ApiOperation({summary: "Ban a user's account"})
  @ApiOkResponse({
    description: "Successfully banned a user "
  })
  banUser(@Param('userid',ParseIntPipe)userid: number) {
    return this.usersService.banUser(userid)
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch('activate/:userid')
  @ApiOperation({summary: "Activate a user's account"})
  @ApiOkResponse({
    description: "Successfully activated a user's account "
  })
  activateUser(@Param('userid',ParseIntPipe) userid : number) {
    return this.usersService.activateUser(userid)
  }

  @Delete('delete')
  @ApiOperation({summary: "Activate a user's account"})
  @ApiOkResponse({
    description: "Successfully activated a user's account "
  })
  remove(@Req() request:Request,@Res() response:Response) {
    return this.usersService.remove(request,response);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(':userid')
  @ApiOperation({
    summary:"The admin enforces the removal of an account in case that the account is faulty"
  })
  @ApiOkResponse({
    description:"Successfully removed user account"
  })
  removedByAdmin(@Param('userid',ParseIntPipe) userid : number) {
    return this.usersService.removedByAdmin(userid)
  }
}
