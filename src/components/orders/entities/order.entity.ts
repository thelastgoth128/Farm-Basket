import { Cart } from "src/components/cart/entities/cart.entity";
import { Payments } from "src/components/payment/entities/payment.entity";
import { Users } from "src/components/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    order_number: string

    @Column({
        type:'timestamp',
        default:'CURRENT_TIMESTAMP'
    })
    created_at: Date

    @ManyToOne(()=>Users,user=>user.order)
    @JoinColumn({name : 'user'})
    user : Users

    @OneToOne(()=>Cart)
    @JoinColumn({name : 'cart'})
    cart: Cart

    @OneToOne(()=>Payments,payment=>payment.order)
    @JoinColumn({name: 'payment'})
    payment : Payments
}
