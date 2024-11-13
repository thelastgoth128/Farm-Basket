import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificatonrep : Repository<Notifications>,
    @InjectRepository(Users)
    private readonly usersrep : Repository<Users>,
  ) {}


  async create(createNotificationDto: CreateNotificationDto) {
   const { user, isread, created_at, text } = createNotificationDto
   const notified = await this.usersrep.findOne({where : {userid : user}})

   if (!notified) {
    throw new NotFoundException('user not found')
   }
   const notification = this.notificatonrep.create({
    user : notified,
    isread : false,
    created_at : new Date(),
    text : createNotificationDto.text
   })
   return await this.notificatonrep.save(notification)
  }

  async findAll(@Req() req:Request) {
    const user = req.user?.userid
    if(!user){
      throw new NotFoundException('you are not logged in')
    }
    const notification =  await this.notificatonrep.find({where: {user:{userid : user}},relations : ['assignedto','taskid','assignedby']})
    if(notification.length === 0){
      throw new NotFoundException('you have no notifications')
    }
    return notification
  }


  async findOne(id: number) {
   return await this.notificatonrep.findOne({where : {id}})
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificatonrep.findOne({where: {id}})

    if (!notification) {
      throw new NotFoundException('notification not found')
    }
    
    Object.assign(notification,updateNotificationDto)
    return await this.notificatonrep.save(notification)
  }

  async remove(id: number) {
    const notification = await this.notificatonrep.findOne({where : {id}})

    if (!notification) {
      throw new NotFoundException('notification not found')
    }
    
    await this.notificatonrep.remove(notification)
    return{
      message : "Successfully deleted notification"
    }
  }
}
