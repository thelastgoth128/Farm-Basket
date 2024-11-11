import { Product } from "src/components/products/entities/product.entity";
import { Users } from "src/components/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Shop {

    @PrimaryGeneratedColumn()
    shopid : number
    
    @OneToOne(()=>Users,user=>user.userid)
    @JoinColumn({
        name : 'owner'
    })
    owner : Users

    @Column()
    name : string

    @Column()
    description : string

    @Column()
    image : string

    @ManyToOne(()=>Product,product=>product.shopid)
    @JoinColumn({name : 'product'})
    product : Product
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
