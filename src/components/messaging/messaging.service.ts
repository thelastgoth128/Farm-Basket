import { Injectable } from '@nestjs/common';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { UpdateMessagingDto } from './dto/update-messaging.dto';

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
  
      return await this.messarep.save(message);
  }

  findAll() {
    return `This action returns all messaging`;
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
