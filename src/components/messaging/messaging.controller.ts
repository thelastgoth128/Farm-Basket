import { Controller, Post, Body, Get, Param, Query, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import { Inbox } from './entities/inbox.entity';
import { Public } from '../auth/guards/public';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Messages')
@Controller('messages')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}


  @Post('inbox')
  @ApiOperation({summary: "Creates an Inbox and adds Partcipants to the participants table"})
  @ApiResponse({
    status: 201,
    description: "Successfully created an Inbox"
  })
  async createInbox(@Body() createInboxDto: CreateInboxDto): Promise<Inbox> {
    return await this.messagingService.createInbox(createInboxDto);
  }

  @Get('inbox/:id/name')
  @ApiOperation({summary: "Get usernames in an inbox"})
  @ApiOkResponse({
    description: "Successfully feteched for the names in an inbox"
  })
  async getInboxName(@Param('id',ParseIntPipe) inboxId: number, @Query('userId') userId: number): Promise<string> {
    return await this.messagingService.getInboxName(inboxId, userId);
  }

  @Get(":inbox/message")
  @ApiOperation({summary: "Get messages in an inbox by inbox id"})
  @ApiOkResponse({
    description: "Successfully fetched messages in an inbox"
  })
  async getInboxMsgs(@Param('inbox', ParseIntPipe) inbox: number) {
    return await this.messagingService.getInboxMsgs(inbox)
  }

  @Get(':id')
  @ApiOperation({summary: "Fetches a specific message by id"})
  @ApiOkResponse({
    description: "Successfully fetched for specific message"
  })
  findOne(@Param('id') id: string) {
    return this.messagingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: "Updates a message details"})
  @ApiOkResponse({
    description: "Successfully updated message"
  })
  update(@Param('id',ParseIntPipe) id: number, @Body() updateMessagingDto: UpdateMessagingDto) {
    return this.messagingService.update(id, updateMessagingDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Deletes a specific message by id"})
  @ApiOkResponse({
    description: "Successfully deleted a message"
  })
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.messagingService.remove(id);
  }
}
