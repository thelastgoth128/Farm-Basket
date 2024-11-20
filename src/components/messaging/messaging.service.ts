import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Inbox } from './entities/inbox.entity';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { InboxParticipants } from './entities/inbox_participants.entity';
import { UpdateMessagingDto } from './dto/update-messaging.dto';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { Messages } from './entities/messaging.entity';

@Injectable()
export class MessagingService {
  constructor(
    @InjectRepository(Messages)
    private readonly messarep : Repository<Messages>,
    @InjectRepository(Users)
    private readonly userRep: Repository<Users>,
    @InjectRepository(Inbox)
    private readonly inboxRep: Repository<Inbox>,
    @InjectRepository(InboxParticipants)
    private readonly inboxPartRep: Repository<InboxParticipants>,
  ) {}

    async create(createMessageDto: CreateMessagingDto) {
      const { inboxid, userid, messages } = createMessageDto;
  
      const user = await this.userRep.findOne({where : {userid}});
      const inbox = await this.inboxRep.findOne({where : {inboxid}});
  
      if (!user) {
        throw new Error('User not found');
      }
  
      if (!inbox) {
        throw new Error('Inbox not found');
      }
  
      const message = new Messages();
      message.userid = user
      message.inboxid = inbox;
      message.messages = messages;
      message.created_at = new Date();
  
     const text = await this.messarep.save(message);
    return text.messages
    }

  async createInbox(createInboxDto: CreateInboxDto): Promise<Inbox> {
    const { userid } = createInboxDto;

    const users = await this.userRep.find({
      where: { userid: In(userid) }
    });

    if (users.length !== userid.length) {
      throw new Error('One or more users not found');
    }

    const inbox = new Inbox();
    await this.inboxRep.save(inbox);

    const participants = users.map(user => {
      const participant = new InboxParticipants();
      participant.inbox = inbox;
      participant.userid = user;
      return participant;
    });

    await this.inboxPartRep.save(participants);
    return inbox;
  }

  async getInboxName(inboxId: number, userId: number): Promise<string> {
    const participants = await this.inboxPartRep.find({
      where: { inbox: { inboxid: inboxId } }, // Correctly reference the inbox
      relations: ['userid']
    });

    const otherParticipants = participants.filter(participant => participant.userid.userid !== userId);
    return otherParticipants.map(participant => participant.userid.name).join(', ');
  }

  findOne(id: number) {
    return `This action returns a #${id} messaging`;
  }

  update(id: number, updateMessagingDto: UpdateMessagingDto) {
    return `This action updates a #${id} messaging`;
  }

  remove(id: number) {
    return `This action removes a #${id} messaging`;
  }
}
