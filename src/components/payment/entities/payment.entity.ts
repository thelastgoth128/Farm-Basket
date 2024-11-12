import { PaymentStatus } from "src/components/enums/payment.enum";
import { Users } from "src/components/users/entities/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Payments {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=>Users,user=>user.userid)
    @JoinColumn({ name : 'userid'})
    userid : number
    
    @Column()
    Amount : number

    @Column()
    reference : string

    @Column({
        type:'enum',
        enum : PaymentStatus,
        default : PaymentStatus.PENDING
    })
    status : PaymentStatus

    @Column()
    mobile : number

    @Column()
    currency : string

    @Column({
        type:'timestamp',
        default:'CURRENT_TIMESTAMPT'

    })
    created_at : Date

    @Column({
        type : 'timestamp',
        default:'CURRENT_TIMESTAMP'
    })
    updated_at : Date
}
