import { Controller, Post, Body, Get, Param, Query, Patch, Delete } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import { Inbox } from './entities/inbox.entity';
import { Public } from '../auth/guards/public';
import { CreateMessagingDto } from './dto/create-messaging.dto';

@Public()
@Controller('messages')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post('send')
  async create(@Body() createMessageDto: CreateMessagingDto) {
    return await this.messagingService.create(createMessageDto)
  }

  @Post('inbox')
  async createInbox(@Body() createInboxDto: CreateInboxDto): Promise<Inbox> {
    return await this.messagingService.createInbox(createInboxDto);
  }

  @Get('inbox/:id/name')
  async getInboxName(@Param('id') inboxId: number, @Query('userId') userId: number): Promise<string> {
    return await this.messagingService.getInboxName(inboxId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessagingDto: UpdateMessagingDto) {
    return this.messagingService.update(+id, updateMessagingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagingService.remove(+id);
  }
}
