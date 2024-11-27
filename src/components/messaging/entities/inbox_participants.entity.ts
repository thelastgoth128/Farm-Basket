import { Users } from "src/components/users/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inbox } from "./inbox.entity";


@Entity()
export class InboxParticipants {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=>Users,user=>user.inboxparticipants)
    @JoinColumn({name : 'userid' })
    userid : Users

    @ManyToOne(()=>Inbox,inbox=>inbox.participants)
    @JoinColumn({name : 'inboxid'})
    inbox : Inbox
}