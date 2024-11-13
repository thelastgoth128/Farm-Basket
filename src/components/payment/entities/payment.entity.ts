import { PaymentStatus } from "src/components/enums/payment.enum";
import { Users } from "src/components/users/entities/user.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Payments {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=>Users,user=>user.payment)
    @JoinColumn({ name : 'userid'})
    userid : Users
    
    @Column()
    amount : number

    @Column({unique:true})
    tax_ref : string

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

    @Column()
    charges : number

    @Column({
        type:'timestamp',
        default:'CURRENT_TIMESTAMPT'

    })
    created_at : Date

    @Column({
        type : 'timestamp',
        nullable : true
    })
    complted_at : Date
}
