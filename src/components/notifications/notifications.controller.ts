import { Controller, Get, Post, Body, Patch, Param, Delete, Req, ParseIntPipe } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Public } from '../auth/guards/public';
import { Request } from 'express';
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Public()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('create')
  @ApiOperation({summary:"Creates a notification for a user"})
  @ApiResponse({
    status:201,
    description: "Successfully sent the notification"
  })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get('user')
  @ApiOperation({summary:"Fetches all notification for a specific user"})
  @ApiOkResponse({
    description: "Successfully fetched all notification for a user"
  })
  findAll(@Req() request:Request) {
    return this.notificationsService.findAll(request);
  }

  @Get(':id')
  @ApiOperation({summary:"Fetches a notification for a specific user"})
  @ApiOkResponse({
    description: "Successfully fetched a notification for a user"
  })
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.notificationsService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({summary:"Updates a notification details"})
  @ApiOkResponse({
    description: "Successfully updated a notification message"
  })
  update(@Param('id',ParseIntPipe) id: number, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete('delete/:id')
  @ApiOperation({summary:"Deletes a notification"})
  @ApiOkResponse({
    description: "Successfully deleted a notification"
  })
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.notificationsService.remove(id);
  }
}
