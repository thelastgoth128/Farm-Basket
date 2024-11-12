import { Products } from "src/components/products/entities/product.entity";
import { Users } from "src/components/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Reports {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(()=>Users,user=>user.reports)
    @JoinColumn({name : 'reporter'})
    reporter : Users

    @ManyToOne(()=> Products, product=> product.reports)
    @JoinColumn({name : 'product'})
    product : Products

    @Column()
    reason : string

    @Column()
    details : string

    @Column({default : 'pending'})
    status : string

    @Column()
    reported_date : Date

    @Column()
    resolution_details : string

    @Column()
    resolution_date : Date

    @Column()
    ban_duration : number

    @Column()
    punishment : string

}
