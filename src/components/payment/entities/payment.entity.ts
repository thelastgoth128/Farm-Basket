import { Cart } from "src/components/cart/entities/cart.entity";
import { PaymentStatus } from "src/components/enums/payment.enum";
import { Order } from "src/components/orders/entities/order.entity";
import { Products } from "src/components/products/entities/product.entity";
import { Users } from "src/components/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payments {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    amount : string

    @Column({unique:true})
    tx_ref : string

    @Column({
        type:'enum',
        enum : PaymentStatus,
        default : PaymentStatus.PENDING
    })
    status : PaymentStatus

    @Column()
    mobile : string

    @Column()
    currency : string

    @Column()
    charges : number

    @Column({
        type:'timestamp',
        default:'CURRENT_TIMESTAMP'
    })
    created_at : Date

    @Column({
        type : 'timestamp',
        nullable : true
    })
    completed_at : Date

    @ManyToOne(()=>Users,user=>user.payments) 
    @JoinColumn({ name: 'user' }) 
    user : Users

    @OneToOne(()=>Cart,cart=>cart.payment)
    @JoinColumn({name : 'cart'})
    cart : Cart

    @OneToMany(()=>Order,order=>order.payment)
    order : Order

  

}
