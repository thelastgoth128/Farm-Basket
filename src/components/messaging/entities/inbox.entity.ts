import { Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Messages } from "./messaging.entity";
import { InboxParticipants } from "./inbox_participants.entity";



@Entity()
export class Inbox {
    @PrimaryGeneratedColumn()
    inboxid : number

    @OneToMany(()=> InboxParticipants, participant=>participant.inbox)
    participants : InboxParticipants[]

    @OneToMany(()=>Messages, message => message.inboxid)
    messages : Messages[]
}