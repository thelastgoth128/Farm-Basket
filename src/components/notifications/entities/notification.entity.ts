import { Users } from "src/components/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notifications {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=>Users,user=>user.notification)
    @JoinColumn({name:'user'})
    user : Users

    @Column()
    text : string

    @Column()
    isread : boolean

    @Column({
        type:'timestamp', default : 'CURRENT_TIMESTAMP'
    })
    created_at : Date
}
