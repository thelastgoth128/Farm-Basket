import { Cart } from "src/components/cart/entities/cart.entity";
import { Role } from "src/components/enums/role.enums";
import { AccountStatus } from "src/components/enums/status.enums";
import { InboxParticipants } from "src/components/messaging/entities/inbox_participants.entity";
import { Messages } from "src/components/messaging/entities/messaging.entity";
import { Notifications } from "src/components/notifications/entities/notification.entity";
import { Payments } from "src/components/payment/entities/payment.entity";
import { Products } from "src/components/products/entities/product.entity";
import { Reports } from "src/components/reports/entities/report.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, OneToMany,ManyToOne , PrimaryGeneratedColumn } from "typeorm";



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

    @Column({
        type : 'enum',
        enum: AccountStatus,
        default:AccountStatus.ACTIVE
    })
    status : AccountStatus

    @OneToMany(()=>Reports,report=>report.reporter)
    reports : Reports[]

    @OneToMany(()=>Payments,payment=>payment.user)
    payment : Payments[]
    
    @OneToMany(()=> Review, review => review.user )
    reviews : Review[]


    @OneToMany(()=>Payments,payment=>payment.user)
    payments : Payments[]

    @OneToMany(()=>Notifications,notification=>notification.user)
    notification : Notifications

    @OneToMany(()=>Cart,cart=>cart.user)
    cart : Cart
}
