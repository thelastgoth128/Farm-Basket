import { Role } from "src/components/enums/role.enums";
import { InboxParticipants } from "src/components/messaging/entities/inbox_participants.entity";
import { Messages } from "src/components/messaging/entities/messaging.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    userid : number

    @Column()
    name : string

    @Column()
    email : string

    @Column()
    password : string

    @Column({
        type: 'enum',
        enum:Role,
        default:Role.BUYER
    })
    role : Role

    @Column()
    location : string

    @Column({nullable :true})
    reset_token: string

    @Column({nullable : true, type: 'timestamp'})
    reset_token_expiry: Date

    @OneToMany(()=>InboxParticipants,participant=>participant.userid)
    inboxparticipants : InboxParticipants[]

    @OneToMany(()=>Messages,message=>message.userid)
    message : Messages[]
}
