import { Users } from "src/components/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inbox } from "./inbox.entity";


@Entity()
export class Messages {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=>Users,user=>user.message)
    @JoinColumn({ name : 'userid'})
    userid : Users

    @ManyToOne(()=>Inbox,inbox=> inbox.messages)
    @JoinColumn({name : 'inboxid'})
    inbox : Inbox

    @Column()
    messages : string

    @Column({
        type: 'timestamp', default:()=>'CURRENT_TIMESTAMP'
    })
    created_at : Date
}
